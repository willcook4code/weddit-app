import Backbone from 'backbone';
import Bio from './../models/Bio.js';

const BioCollection = Backbone.Collection.extend({
	model: Bio,
	url: '/api/v1/bio'
});

export default new BioCollection();