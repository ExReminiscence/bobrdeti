// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'bobrdeti.by',
	'brand': 'bobrdeti.by',
	'stylus': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'wysiwyg images': true,
	'wysiwyg cloudinary images': true,
	'wysiwyg additional options': { 'external_plugins': { 'uploadimage': '/js/uploadimage/plugin.min.js' }, 'fontsize_formats': '1px 2px 3px 4px 5px 6px 7px 8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px 36px 48px 52px 68px 72px'},
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional buttons': 'searchreplace visualchars,' + ' charmap ltr rtl pagebreak paste, forecolor backcolor fontsizeselect fontselect,' +' emoticons media, preview print ',
	'wysiwyg additional plugins': 'example, table, advlist, anchor,'
   + ' autolink, autosave, charmap, contextmenu, '
   + ' directionality, emoticons, hr, media, pagebreak,'
   + ' paste, preview, print, searchreplace, textcolor,'
   + ' visualblocks, visualchars, wordcount ',


	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('cloudinary secure', true);

keystone.set('signin logo', 'https://bobrdeti.by/img/logo.png');

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	добавление_страницы: 'posts',
	для_статей : {
		категории_статей: 'post-categories',
		подкатегории_статей: 'post-sub-categories',
	},
	для_футера: {
		Правовая_информая : 'info-footers',
		Карта_сайта : 'map-footers',
		Правила_пользования : 'rule-footers',
		Контакты : 'contact-footers',
		соцсети: 'socials',
	},
	для_полезных_адресов : {
		категории_полезных_адресов : 'usefull-categories',
		подкатегории_полезных_адресов : 'usefull-sub-categories',
	},
	о_нас : 'abouts',
	пользователи : 'users',
	рубрики_для_объявлений: 'board-rubrics',
	рубрики_для_афиши : 'afisha-rubrics',
	рубрики_для_новостей : 'rubrics',
	реклама: 'reklamas',
	галерея: 'galleries',


});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
