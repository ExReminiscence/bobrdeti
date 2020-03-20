/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');

var moment = require('moment');
const sm = require('sitemap');
var sslRedirect = require('heroku-ssl-redirect');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};


/* sitemap */
const sitemap = sm.createSitemap ({
  hostname: 'https://www.bobruisk-arena.by/',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: 'https://www.bobruisk-arena.by/',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/history-club',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/hk-bobruisk/administracion',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/hk-bobruisk/trade-union-committee',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/hk-bobruisk/job-openings',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/kontact',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
    { url: 'https://www.bobruisk-arena.by/extraliga/trainers',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/extraliga/sostav',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/extraliga/calendar',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/extraliga/match',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/extraliga/gallery',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/majorleague/trainers',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/majorleague/sostav',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/majorleague/calendar',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/majorleague/match',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/majorleague/gallery',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/administracion',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/team',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/nabor',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/normativ-pravo',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/behavior-rules',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/calendar',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/dush/gallery',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/raspisanie',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/news/sportivnye-novosti-bobruiska',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/news/novosti-khokkeya',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/news/novosti-sporta',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/news/khk-bobruisk',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0},
		{ url: 'https://www.bobruisk-arena.by/onewindow',  changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'),  priority: 1.0}
  ]
});


// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.use(sslRedirect());
	app.get('/sitemap.xml', function(req, res) {
  	sitemap.toXML( function (err, xml) {
	      if (err) {
	        return res.status(500).end();
	      }
	      res.header('Content-Type', 'application/xml');
	      res.send( xml );
	  });
	});
	app.get('/robots.txt', function (req, res) {
	    res.type('text/plain');
	    res.send("User-agent: *\nDisallow: /keystone/\nCrawl-delay: 3\nSitemap: https://www.bobruisk-arena.by/sitemap.xml");
	});
	app.get('/', routes.views.index);
	app.get('/news/:category?', routes.views.blog);
	app.get('/news/article/:post', routes.views.post);
	app.get('/hk-bobruisk/administracion', routes.views.administracion);
	app.get('/hk-bobruisk/trade-union-committee', routes.views.administracion);
	app.get('/hk-bobruisk/job-openings', routes.views.administracion);
	app.get('/extraliga/match', routes.views.extraligamatch);
	app.get('/majorleague/match', routes.views.extraligamatch);
	app.get('/extraliga/calendar', routes.views.extraligacalendar);
	app.get('/majorleague/calendar', routes.views.extraligacalendar);
	app.get('/extraliga/sostav', routes.views.extraligasostav);
	app.get('/majorleague/sostav', routes.views.extraligasostav);
	app.get('/extraliga/trainers', routes.views.extraligatraner);
	app.get('/majorleague/trainers', routes.views.extraligatraner);
	app.get('/extraliga/gallery/:category?', routes.views.gallery);
	app.get('/extraliga/gallery/album/:post', routes.views.gallerypost);
	app.get('/extraliga/gallery/album/video/:post', routes.views.gallerypostvideo);
	app.get('/majorleague/gallery/:category?', routes.views.gallerymajor);
	app.get('/majorleague/gallery/album/:post', routes.views.gallerypostmajor);
	app.get('/majorleague/gallery/album/video/:post', routes.views.gallerypostmajorvideo);
	app.get('/dush/gallery/:category?', routes.views.gallerydush);
	app.get('/dush/gallery/album/:post', routes.views.gallerypostdush);
	app.get('/dush/gallery/album/video/:post', routes.views.gallerypostdushvideo);
	app.get('/dush/administracion', routes.views.dush);
	app.get('/dush/calendar', routes.views.dush);
	app.get('/dush/nabor', routes.views.dush);
	app.get('/dush/normativ-pravo', routes.views.dush);
	app.get('/dush/exchange-fund', routes.views.dush);
	app.get('/dush/behavior-rules', routes.views.dush);
	app.get('/dush/team', routes.views.dushteam);
	app.get('/raspisanie', routes.views.raspisanie);
	app.get('/service/ticket', routes.views.service);
	app.get('/service/arenda', routes.views.service);
	app.get('/service/sbori', routes.views.service);
	app.get('/service/korporat', routes.views.service);
	app.get('/service/organizator', routes.views.service);
	app.get('/service/sport/:sport', routes.views.sport);
	app.get('/service/other/:sport', routes.views.other);
	app.get('/infrastructure/kafe-bar-overtaim', routes.views.infrastructure);
	app.get('/infrastructure/gostinnyi-dom', routes.views.infrastructure);
	app.get('/infrastructure/souvenirs', routes.views.souvenirs);
	app.get('/infrastructure/souvenirs/:souvenir', routes.views.souvenir);
	app.get('/kontact', routes.views.kontact);
	app.get('/onewindow', routes.views.onewindow);
	app.get('/anekdot', routes.views.anekdot);
	app.get('/history-club', routes.views.historyclub);
	app.all('/contact', routes.views.contact);
	app.all('/primer', routes.views.primer);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
