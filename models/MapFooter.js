var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var MapFooter = new keystone.List('MapFooter', {
	label: 'Карта сайта',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

MapFooter.add({
	content: { label: 'описание', type: Types.Html, wysiwyg: true, height: 400	},
	
});


MapFooter.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
MapFooter.register();
