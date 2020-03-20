var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostSubCategory Model
 * ==================
 */

var UsefullSubCategory = new keystone.List('UsefullSubCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  label: 'Подкатегории полезных адресов',
});

UsefullSubCategory.add({
  name: { label:'Название подкатегории полезных адресов',type: String, required: true },
  parentCategory: { type: Types.Relationship, ref: 'UsefullCategory', required: true, initial: true }
});

UsefullSubCategory.defaultColumns = 'name';

UsefullSubCategory.register();
