var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var BoardRubric = new keystone.List('BoardRubric', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Рубрики для объявлений',
});

BoardRubric.add({
	name: { type: String, required: true },
});



BoardRubric.relationship({ ref: 'Post', path: 'posts', refPath: 'boardrubrics' });

BoardRubric.track = true;
BoardRubric.register();