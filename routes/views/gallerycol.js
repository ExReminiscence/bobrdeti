var keystone = require('keystone');
var Post = keystone.list('Post');
var moment = require('moment');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallery';
	locals.filters = {
		gallerycol: req.params.gallerycol
	};
	locals.data = {
		posts: [],
		afishaIndex: []
	};

	view.on('init', function (next) {
		var q = keystone.list('Post').model.find().where('news', true).where('hotnews', false).where('state', 'Опубликовать').sort('-publishedDate').populate('rubrics').skip(4).limit(3);
		q.exec(function (err, results) {

			locals.othernewsmenu = results;

			next(err);
		});
	});

	view.query('afishaRubric', keystone.list('AfishaRubric').model.find().sort('name'));

	view.on('init', function (next) {

		var datenow = moment().format('YYYY-MM-DD');

		var q = keystone.list('Post').model.find({
			state: 'Опубликовать',
			afisha: true,
			meetDate: datenow
		}).populate('sectionAfisha');

		q.exec(function (err, results) {
			locals.data.afishaIndex = results;
			next(err);
		});
	});

	view.on('init', function (next) {
		var q = Post.model.find({
			hotnews: false,
			state: 'Опубликовать',
			news: false,
			afisha: false,
			articl: true
		}).sort('-publishedDate').limit(3);
		q.exec(function (err, results) {

			locals.otherarticlsmenu = results;

			next(err);
		});
	});

	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().exec(function (err, result) {
			locals.data.categorymenu = result;
			next(err);
		});
	});

	view.query('postCategoryMenu', keystone.list('Rubric').model.find());

	// Load the current post
	view.on('init', function (next) {

		let catpost;

		var q = keystone.list('Gallery').model.findOne({
			key: locals.filters.gallerycol,
		});

		q.exec(function (err, result) {
			locals.data.post = result;
      locals.title = result.name;

			next(err);

		});




	});

	// Render the view
	view.render('gallerycol');
};
