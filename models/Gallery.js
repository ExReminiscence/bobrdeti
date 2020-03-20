var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	label: 'Галерея',
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: {label: 'Название', type: String, required: true },
	image: { label: 'Главная картинка',type: Types.CloudinaryImage },
	images: {label: 'Картинки', type: Types.CloudinaryImages },
	publishedDate: { label:'Дата публикации',type: Types.Date, default: Date.now,inputFormat: 'YYYY-MM-DD h:mm:ss' },
});

Gallery.register();
