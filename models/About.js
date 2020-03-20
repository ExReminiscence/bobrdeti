var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var About = new keystone.List('About', {
	label: 'о нас',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

About.add({
	publishedDate: { label: 'Дата публикации',type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { label: 'Дата публикации',type: Types.CloudinaryImage },
	content: { label: 'описание', type: Types.Html, wysiwyg: true, height: 400	}
});


About.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
About.register();
