var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallerydush';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: []
	};

	locals.title = 'ДЮСШ | Галерея';

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	// Load all categories
	view.on('init', function (next) {

		keystone.list('GalleryCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Gallery').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('GalleryCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		if (locals.data.category) {
			var q = keystone.list('Gallery').paginate({
				page: req.query.page || 1,
				perPage: 15,
				maxPages: 6,
				filters: {
					state: 'ДЮСШ',
					categories: locals.data.category
				},
			})
				.sort('-publishedDate')
				.populate('categories');
		} else {
			var q = keystone.list('Gallery').paginate({
				page: req.query.page || 1,
				perPage: 15,
				maxPages: 6,
				filters: {
					state: 'ДЮСШ'
				}
			})
				.sort('-publishedDate')
				.populate('categories');
		}

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('gallerydush');

};
