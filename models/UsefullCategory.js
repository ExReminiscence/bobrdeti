var keystone = require('keystone');
var Types = keystone.Field.Types;


var UsefullCategory = new keystone.List('UsefullCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Категории для полезных адресов',
});

UsefullCategory.add({
    name: { type: String, required: true },
    image: { label:'Картинка полезных адресов',type: Types.CloudinaryImage },
    subcategorie: {label: 'Выберите подкатегорию', type: Types.Relationship, ref: 'UsefullSubCategory', many: true },
});


UsefullCategory.track = true;
UsefullCategory.register();
