var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Social = new keystone.List('Social', {
	label: 'Соц сети',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Social.add({	
	title: { label: 'Название', type: String, required: true , text: true},
    image: { label:'Картинка',type: Types.CloudinaryImage },
	address: { label: 'описание,ссылка', type: Types.Text, min: 4, max: 20 },
});


Social.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Social.register();
