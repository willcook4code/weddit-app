import Backbone from 'backbone';
import Scrapbook from './../models/Scrapbook.js';

const ScrapbookCollection = Backbone.Collection.extend({
	model: Scrapbook,
	url: '/api/v1/scrapbook'
});

export default new ScrapbookCollection();