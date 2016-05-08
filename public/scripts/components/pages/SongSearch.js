import React from 'react';
import $ from 'jquery';
import SongEntry from './Subcomponents/SearchResults';

export default React.createClass({
	getInitialState: function() {
		return {
			song: []
		};
	},
	render: function() {
		const eachSong = this.state.song.map((song, i, array) => {
			if (!song.album.images[0]) {
				song.album.images.push({url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'});
			}
			return (
				<SongEntry 
				key = {i}
				trackId = {song.id}
				pic = {song.album.images[0].url}
				title ={song.name}
				band = {song.artists[0].name}
				/>
				);
		});
		return (
			<div className='songRequestBox'>
				<h2>Request a Song!</h2>
				<input type='text' placeholder='Song Title' ref='songSearch'/>
				<button onClick= {this.runSearch}>Search</button>
				{eachSong}
			</div>
		);
	},
	runSearch: function() {
		let songSearch = this.refs.songSearch.value;
		this.spotifySearch = $.get('https://api.spotify.com/v1/search?q=%27'+songSearch+'%27&type=track', function(songs) {
			this.setState({
				song: songs.tracks.items
			});
		}.bind(this));
		this.refs.songSearch.value = '';
	}
});