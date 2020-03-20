var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Reklama = new keystone.List('Reklama', {
	label: 'РЕКЛАМА',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },

});

Reklama.add({
	title: { label: 'Название рекламы', type: String, required: true , text: true},
	state: { label: 'Публикация', type: Types.Select, options: 'Опубликовать, Архив', default: 'Опубликовать', index: true },
	sort: { label: 'Сортировка (по номеру)', type: Types.Number },
	image: { label:'Картинка',type: Types.CloudinaryImage },
	content: { label:'Контент',label: 'ссылка', type: Types.Text},

});


Reklama.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Reklama.register();
