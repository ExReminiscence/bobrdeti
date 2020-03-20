var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'souvenirs';

  locals.data = {
		posts: []
	};

	locals.title = 'Сувенирная продукция';

  view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

  view.on('init', function (next) {

			var q = keystone.list('Souvenirs').paginate({
				page: req.query.page || 1,
				perPage: 9,
				maxPages: 6,
			})
				.sort('-publishedDate');


		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('souvenirs');

};
