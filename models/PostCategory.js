var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Категории для статьи',
});

PostCategory.add({
	name: { type: String, required: true },
});

PostCategory.add('Подкатегории',{
	subcategories: {label: 'Выберите подкатегорию', type: Types.Relationship, ref: 'PostSubCategory', many: true },
	publishedDate: { label:'Сортировка',type: Types.Number },
});


PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.track = true;
PostCategory.register();
