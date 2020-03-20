var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		post: [],
	};

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {

			locals.data.post = result;
			locals.title = result.title;
			next(err);
		});

	});

	// Render the view
	view.render('post');
};
