var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var InfoFooter = new keystone.List('InfoFooter', {
	label: 'Правовая информация футера',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

InfoFooter.add({
	content: { label: 'описание', type: Types.Html, wysiwyg: true, height: 400	},
	
});


InfoFooter.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
InfoFooter.register();
