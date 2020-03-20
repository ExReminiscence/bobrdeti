var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var AfishaRubric = new keystone.List('AfishaRubric', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Рубрики для афиши',
});

AfishaRubric.add({
	name: { type: String, required: true },
	color: { type: Types.Color }
});



AfishaRubric.track = true;
AfishaRubric.register();