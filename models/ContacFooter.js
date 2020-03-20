var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var ContactFooter = new keystone.List('ContactFooter', {
	label: 'Контакты футера',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ContactFooter.add({
	content: { label: 'описание', type: Types.Html, wysiwyg: true, height: 400	},
	
});


ContactFooter.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
ContactFooter.register();
