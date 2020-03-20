var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var RuleFooter = new keystone.List('RuleFooter', {
	label: 'Правила пользования (футер)',
	autokey: { path: 'slug', from: 'name', unique: true },
});

RuleFooter.add({
	name: { type: String, required: true },
	content: { label: 'описание', type: Types.Html, wysiwyg: true, height: 400	},
	
});


RuleFooter.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
RuleFooter.register();
