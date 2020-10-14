var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	label: 'Страницы',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
    publicPath: './public/uploads/files', // path where files will be served
  }
});

Post.add({
	title: { label: 'Название', type: String, required: true , text: true},
	state: { label: 'Публикация', type: Types.Select, options: 'Опубликовать, Архив', default: 'Архив', index: true },
	boardfilter: { label: 'Фильтр для объявления', type: Types.Select, options: 'Любое, Новое,Б/У'},
	boardTypeProdam: { label: 'Тип объявления ПРОДАМ', type: Types.Boolean},
	boardTypeBuy: { label: 'Тип объявления КУПИТЬ', type: Types.Boolean},
	boardTypeObmen: { label: 'Тип объявления МЕНЯЮ', type: Types.Boolean},
	boardTypeBaraholka: { label: 'Тип объявления БАРАХОЛКА', type: Types.Boolean},
	boardTypeBlago: { label: 'Тип объявления БЛАГОТВОРИТЕЛЬНОСТЬ', type: Types.Boolean},
	boardANY: {label:'ЛЮБОЙ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean},
	boardNEW: {label:'НОВЫЙ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean},
	boardBY: {label:'БУ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean},
	sectionAfisha: { label: 'Раздел для афиши', type: Types.Relationship, ref: 'AfishaRubric', dependsOn: { afisha: true }, index: true},
	boardfilter: { label: 'Фильтр для объявления', type: Types.Select, options: 'Любое, Новое,Б/У', dependsOn: { board: true }},
	boardTypeProdam: { label: 'Тип объявления ПРОДАМ', type: Types.Boolean, dependsOn: { board: true }},
	boardTypeBuy: { label: 'Тип объявления КУПИТЬ', type: Types.Boolean, dependsOn: { board: true }},
	boardTypeObmen: { label: 'Тип объявления МЕНЯЮ', type: Types.Boolean, dependsOn: { board: true }},
	boardTypeBaraholka: { label: 'Тип объявления БАРАХОЛКА', type: Types.Boolean, dependsOn: { board: true }},
	boardTypeBlago: { label: 'Тип объявления БЛАГОТВОРИТЕЛЬНОСТЬ', type: Types.Boolean, dependsOn: { board: true }},
	boardANY: {label:'ЛЮБОЙ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean, dependsOn: { board: true }},
	boardNEW: {label:'НОВЫЙ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean, dependsOn: { board: true }},
	boardBY: {label:'БУ ТОВАР (ОБЬЯВЛЕНИЕ)', type: Types.Boolean, dependsOn: { board: true }},
	author: { label:'Автор',type: Types.Relationship, ref: 'User', index: true },
	news: { label:'Новость', type: Types.Boolean },
	articl: { label:'Статья', type: Types.Boolean },
	afisha: { label:'Афиша', type: Types.Boolean },
	hotnews: { label:'Горячая новость?', type: Types.Boolean },
});

Post.add({
	usefull: { label:'Полезные адреса', type: Types.Boolean },
	board: { label:'Доска объявлений', type: Types.Boolean },
	newArticle: { label:'Новая статья', type: Types.Boolean, dependsOn: { articl: true } },
	popularReq: { label:'Популярные запросы', type: Types.Boolean, dependsOn: { articl: true } },
	afishaType1: { label:'Досуг с детьми', type: Types.Boolean, dependsOn: { afisha: true } },
	afishaType2: { label:'Выходные', type: Types.Boolean, dependsOn: { afisha: true } },
	publishedDate: { label:'Дата публикации',type: Types.Date, default: Date.now, inputFormat: 'YYYY-MM-DD, H:mm', utc: false, initial: true },


  afishaPeriud: { label:'Афиша с периодами', type: Types.Boolean, dependsOn: { afisha: true } },
  afishaPostoyanno: { label:'Афиша постоянно', type: Types.Boolean, dependsOn: { afisha: true } },

	meetDate: { label:'Дата проведения мероприятия',type: Types.DateArray, dependsOn: { usefull: false, afisha: true, afishaPeriud: true } },
  meetDatePostoyanno: { label:'Дата проведения мероприятия',type: Types.DateArray, dependsOn: { usefull: false, afisha: true, afishaPostoyanno: true } },
	image: { label:'Картинка',type: Types.CloudinaryImage, autoCleanup : true },
	kratkoe: { label: 'Краткое описание', type: Types.Textarea, height:200, min: 0, max: 220	},
	content: { label: 'Описание', type: Types.Html, wysiwyg: true,  height: 400	},
	code: { label: 'Код для вставки', type: Types.Code, height: 120, language: 'js' },
	categories: { label:'Категории статей',type: Types.Relationship, ref: 'PostCategory', many: true, dependsOn: { articl: true } },
	subcategory: {label: 'Подкатегории статей', type: Types.Relationship, ref: 'PostSubCategory', many: false, dependsOn: { articl: true } },
	rubrics: { label:'Рубрики новостей',type: Types.Relationship, ref: 'Rubric', many: true,  dependsOn: { news: true } },
	boardrubrics: { label:'Рубрики для объявлений',type: Types.Relationship, ref: 'BoardRubric', many: true,  dependsOn: { board: true } },
	cost: { label: 'Цена товара' , type: Types.Html, wysiwyg: true, height: 200, dependsOn: { board: true }},
	postAutor: { label: 'Автор записи' , type: Types.Text, height: 200},
	usefullCategory: { label:'Категории полезных адресов',type: Types.Relationship, ref: 'UsefullCategory', many: true },
	usefullsubcategory: {label: 'Подкатегории полезных адресов', type: Types.Relationship, ref: 'UsefullSubCategory', many: false, dependsOn: { usefull: true } },
	view: {label: 'Просмотры страницы', type: Types.Number, default: 0 }
});

Post.add( 'Для CEO',{
  ceo: {
    title: { label: 'Тэг Title(50-70 символов)', type: String },
    desctiption: { label: 'Описание(150–160 символов)', type: Types.Html }
  }
});

Post.defaultSort = '-publishedDate';
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
