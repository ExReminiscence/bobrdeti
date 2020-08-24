var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var sslRedirect = require('heroku-ssl-redirect');
var moment = require('moment');
const SitemapGenerator = require('sitemap-generator');
var sitemap = require('express-sitemap')();
var secure = require('express-force-https');


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};


var generator = SitemapGenerator('https://bobrdeti.by', {
  maxDepth: 0,
  filepath: 'routes/views/sitemap.xml',
  maxEntriesPerFile: 50000,
  stripQuerystring: true,
	changeFreq: 'hourly',
	lastMod: true
});

generator.on('done', () => {
  console.log('_____________________________________done________________________________________');
});

generator.start();


// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	//app.use(sslRedirect());
	app.use(secure);
	app.all('/', routes.views.index);
	app.get('/sitemap.xml', function(req, res) {
		res.sendFile('./views/sitemap.xml' , { root : __dirname});
	});
	app.get('/robots.txt', function (req, res) {
	    res.type('text/plain');
	    res.send("User-agent: *\nDisallow: /keystone/\nCrawl-delay: 3\nSitemap: https://bobrdeti.by/sitemap.xml");
	});
  app.get('/ads.txt', function (req, res) {
	    res.type('text/plain');
	    res.send("google.com, pub-6636788620742177, DIRECT, f08c47fec0942fa0");
	});
	app.all('/news/:category?', routes.views.blog);
	app.all('/gallery', routes.views.gallery);
	app.all('/gallery', routes.views.gallery);
	app.all('/gallery/:gallerycol', routes.views.gallerycol);
	app.all('/contact', routes.views.contact);
	app.all('/afisha', routes.views.afisha);
	app.all('/afisha/:rubric', routes.views.afishaRubric);
	app.all('/afishaResults', routes.views.afishaResults);
	app.all('/dosug', routes.views.dosug);
	app.all('/output', routes.views.output);
	app.all('/usefull', routes.views.usefull);
	app.all('/usefull/category/:category?/:subcategory?', routes.views.usefullPost);
	app.all('/board', routes.views.board);
	app.all('/board/:boardrubrics?', routes.views.board);
	app.all('/about', routes.views.about);
	app.all('/article/:category?', routes.views.article);
	app.all('/article/:category?/:subcategory?', routes.views.article);
	app.all('/new', routes.views.articleNew);
	app.all('/popular', routes.views.popular);
	app.all('/contacts', routes.views.contactFooter);
	app.all('/rules', routes.views.ruleFooter);
	app.all('/information', routes.views.infoFooter);
	app.all('/map', routes.views.mapFooter);
	app.all('/search', routes.views.search);
	app.all('/:post?', routes.views.post);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
