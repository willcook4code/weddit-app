import React from 'react';
import Locations from '../../collections/AccommodationCollection';
import Scrapbook from '../../collections/ScrapbookCollection';
import HotelDisplay from './Subcomponents/HotelList';
import VenueDisplay from './Subcomponents/VenueMap';
import LocationsDisplay from './Subcomponents/NearbyMaps';
import SongSearch from './SongSearch';
import user from '../../stores/user';
import attendee from '../../stores/attendee';
import {browserHistory} from 'react-router';
import bio from '../../stores/bio';
import $ from 'jquery';

export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			attendee: attendee,
			Locations: Locations,
			bio: bio,
			searchType: ['Restaurants', 'Attractions'],
			areaZip: '',
			updateMsg: ''
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', this.changeAttendee);
		this.state.user.on('update change', this.changeUser);
		Locations.on('update', this.updateAreaZip);
		this.state.bio.on('update change', this.updateBio);
		if (attendee.get('userId')) {
			Locations.fetch({
				data: {
					where: {
						userId: attendee.get('userId')
					}
				}
			});
			$.ajax({
		    url: '/api/v1/bio',
		    method: 'get',
		    data: {
		        where: {
		            userId: attendee.get('userId')
		        }
		    },
		    success: (entry) => {this.state.bio.set(entry[0]);}
			});
		} else if (user.get('id')) {
			Locations.fetch({
				data: {
					where: {
						userId: user.get('id')
					}
				}
			});
			$.ajax({
		    url: '/api/v1/bio',
		    method: 'get',
		    data: {
		        where: {
		            userId: this.state.user.get('id')
		        }
		    },
		    success: (entry) => {this.state.bio.set(entry[0]);}
			});
		} else {
			browserHistory.push('/');
		}
	},
	componentWillUnmount: function () {
		this.state.attendee.off('change', this.changeAttendee);
		this.state.user.off('change', this.changeUser);
		Locations.off('update', this.updateAreaZip);
		this.state.bio.off('update change', this.updateBio);
	},
	updateBio: function() {
		this.setState({
			bio: this.state.bio
		});
	},
	updateAreaZip: function () {
		this.setState({
			areaZip: Locations.findWhere({locationType: 'Venue'}).get('zip')
		});
	},
	changeUser: function() {
		this.setState({
			user: user
		});
	},
	changeAttendee: function () {
		this.setState({
			attendee: attendee
		});
	},
	openInfoModal: function() {
        this.setState({
            infoModalVisible: true
        });
    },
    closeInfoModal: function() {
        this.setState({
            infoModalVisible: false
        });
    },
    updateAtt: function(e) {
    	e.preventDefault();
		this.state.attendee.save({
			party: this.refs.party.value
		});
		this.setState({
			updateMsg: 'Your party has been updated to a total of '+this.refs.party.value+'.'
		});
    },
    handleFilestack: function(e) {
		e.preventDefault();
 		filepicker.pick({
		    	conversions: ['crop', 'rotate'],
				cropRatio: 1,
				cropForce: true,
		    	services: ['COMPUTER', 'CONVERT', 'FACEBOOK'],
		    	mimetype: 'image/*'
		   	},
		   	(Blob) => {
		   		if (this.state.user.get('id')) {
			     	Scrapbook.create({
			     		pic: Blob.url,
						name: 'You',
						caption: this.refs.caption.value,
						inSlideshow: true,
						userId: this.state.user.get('id')
			     	});
			     	this.refs.caption.value = '';
			    } else {
			    	Scrapbook.create({
			     		pic: Blob.url,
						name: this.state.attendee.get('name'),
						caption: this.refs.caption.value,
						inSlideshow: true,
						userId: this.state.attendee.get('userId')
			     	});
			    	this.refs.caption.value = '';
			    }
		   	}
		);
	},
	render: function() {
		let updateRsvp = null;
		if (this.state.attendee.get('isGoing')) {
			updateRsvp = (
				<div className='updateRsvp'>
					<h3 className="updateRsvpHeader">Update RSVP</h3>
					<p>Number Attending</p>
					<input type='number' min='0' max={this.state.attendee.get('maxGuests')} ref='party'/>
					<p>{this.state.updateMsg}</p>
					<button onClick={this.updateAtt}>Submit</button>
				</div>
				);
		}
		const listedHotels = this.state.Locations.models.filter((location, i, array) => {
			if (location.get('locationType') === 'Hotel') {
				return true;
			} else {
				return false;
			}
		}).map((hotel, i, array) => {
			return (
				<HotelDisplay 
				key = {i}
				name = {hotel.get('name')}
				zip = {hotel.get('zip')}
				phoneNumber = {hotel.get('phoneNumber')}
				hotelUrl = {hotel.get('hotelUrl')}
				cutoffDate = {hotel.get('cutoffDate')}
				rate = {hotel.get('rate')}
				/>
				);
		});
		const listedVenue = this.state.Locations.models.filter((location, i, array) => {
			if (location.get('locationType') === 'Venue') {
				return true;
			} else {
				return false;
			}
		}).map((venue, i, array) => {
			return (
				<VenueDisplay
				key = {i}
				venName = {venue.get('name')}
				venZip = {venue.get('zip')}
				/>
			);
		});
		const eachSearch = this.state.searchType.map((type, i, array) => {
			return (
				<LocationsDisplay
				key = {i}
				searchType = {type}
				areaZip = {this.state.areaZip}
				/>
			);
		});
		let bioPicture = {backgroundImage: 'url('+this.state.bio.get('pic')+')'};
		let registries = [this.state.bio.get('registry1'), this.state.bio.get('registry2')];
		let eachReg = registries.map((registry, i, array) => {
			if (registry === '') {
				return null;
			} else {
				let url = null;
				if (registry.indexOf('http://') === -1) {
					url = 'http://'+registry;
				} else {
					url = registry;
				}
				let initReg = url.substring((url.indexOf('.'))+1, url.indexOf('.com'));
				let regTitle = initReg.charAt(0).toUpperCase()+initReg.substring(1);
				return (
					<li key={i}><a className="bioBody" href={url} target='_blank'>{regTitle}</a></li>
					);
			}
		});
		let honeyfund = null;
		if (this.state.bio.get('honeyfund') !== '') {
			let honeyUrl = null;
				if ((this.state.bio.get('honeyfund')).indexOf('http://') === -1) {
					honeyUrl = ('http://'+this.state.bio.get('honeyfund'));
				} else {
					honeyUrl = this.state.bio.get('honeyfund');
				}
			let initHoney = honeyUrl.substring((honeyUrl.indexOf('.'))+1, honeyUrl.indexOf('.com'));
			let honeyTitle = initHoney.charAt(0).toUpperCase()+initHoney.substring(1);
			honeyfund = <p className="honList">Honeyfund - <a href={honeyUrl} target='_blank'>
				{honeyTitle}</a></p>;
		}
		return(
			<section className='attendeesPage'>
				<div className="attLeftSide" style={bioPicture}>
					<div key={this.state.bio.get('id')} className="bioContainer">
						<h2 className="greeting"><i>Greetings from {this.state.bio.get('registrant1')} & {this.state.bio.get('registrant2')}!</i></h2>
						<div className="bioWrapper">
							<h2 className="stryHeading">Our Story</h2>
							<p className="bioBody">{this.state.bio.get('story')}</p>
							<h2 className="stryHeading">Links to Our Registries</h2>
							<ol className="regList">{eachReg}</ol>
							{honeyfund}
						</div>
					</div>
					<div className="mapContainer">
						<div className='hotelDisplay mapDisplay'>
							<h2 className="mapTitle"><i>Hotels</i></h2>
							{listedHotels}
						</div>
						<div className='venueDisplay mapDisplay btmMaps'>
							<h2 className="mapTitle btmTitle"><i>Venue(s)</i></h2>
							{listedVenue}
						</div>
						<div className='wideSearchDisplay mapDisplay btmMaps'>
							{eachSearch}
						</div>
					</div>
				</div>
				<div className="attActionContainer">
					{updateRsvp}
					<div className='songRequestBox'>
						<h2 className="requestHeader"><i>Share a Memory!</i></h2>
						<p>Your favorite photos of the bride and/or groom.</p>
						<input type='text' placeholder='Caption (optional)' ref='caption'/>
						<button className="songSrchBtn"onClick= {this.handleFilestack}>Post a Photo</button>
					</div>
					<SongSearch 
					userId = {this.state.attendee.get('userId')}
					/>
				</div>
			</section>
			);
	}
});