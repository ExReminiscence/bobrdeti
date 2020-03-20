var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'sport';
	locals.filters = {
		sport: req.params.sport
	};
	locals.data = {
		sport: []
	};

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Sport').model.findOne({
			slug: locals.filters.sport,
		});

		q.exec(function (err, result) {
			locals.data.sport = result;
			locals.title = result.title;

			next(err);
		});

	});

	// Render the view
	view.render('sport');
};
