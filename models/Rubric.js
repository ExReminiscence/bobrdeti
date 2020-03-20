var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var Rubric = new keystone.List('Rubric', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Рубрики для новостей',
});

Rubric.add({
	name: { type: String, required: true },
});



Rubric.relationship({ ref: 'Post', path: 'posts', refPath: 'rubrics' });

Rubric.track = true;
Rubric.register();