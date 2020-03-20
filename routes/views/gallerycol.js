var keystone = require('keystone');

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
