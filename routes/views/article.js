var keystone = require('keystone');
var async = require('async');
var API_KEY = 'e491b43abbd935ff964373593a96a985-87cdd773-8b0b2e85';
var DOMAIN = 'sandboxfe36e0fc9e28432c9464d3f52a713b5b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		keywords: req.query.keywords,
		category: req.params.category,
		subcategory: req.params.subcategory,
	/*	currentcategory: req.params.currentcategory,  */
	};
	locals.data = {
		posts: [],
		categories: [],
	/*	currentcategories: [], */
		keywords: "",
		afishaIndex: []
	};

	locals.title = 'Статьи';
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());
	view.query('reklama', keystone.list('Reklama').model.find().where('state', 'Опубликовать').sort('sort'));
	view.query('social', keystone.list('Social').model.find());

	view.on('init', function (next) {
		var q = keystone.list('Post').model.find().where('news', true).where('hotnews', false).where('state', 'Опубликовать').sort('-publishedDate').populate('rubrics').skip(4).limit(3);
		q.exec(function (err, results) {

			locals.othernewsmenu = results;

			next(err);
		});
	});

	view.on('post', { action: 'subscription' }, function (next) {

		if (!req.body.subscriber) {
			req.flash('error', { title: 'Ошибка подписки', detail: 'Вы должны ввести адрес электронной почты!' });
			return next();
		}

		if (req.body.subscriber) {
			req.flash('success', { detail: 'Спасибо, Вы удачно подписались на нас.' });

			const mail = {
	      from: 'Новый подписчик на bobrdeti.by <bobrdeti9@gmail.com>',
	      to: 'bobrdeti9@gmail.com',
	      subject: 'Новый подписчик на bobrdeti.by',
	      html:`
	        <div style="display:block;">
	        <br>
	        <img src="https://momportal.herokuapp.com/img/logo.png">
	    		<h2>Новый подписчик</h2>
	    		<ul>
	    		<li><b>E-mail:</b> ${req.body.subscriber}</li>
	    		</ul>
	        </div>`,
	    };

	    mailgun.messages().send(mail, (error, body) => {
	      console.log(body);
	    });

			res.redirect('#');
		}

	});

	view.query('postCategory1', keystone.list('PostCategory').model.find().sort('name').limit(3));
	view.query('postCategory2', keystone.list('PostCategory').model.find().sort('name').skip(3).limit(3));
	view.query('postCategory3', keystone.list('PostCategory').model.find().sort('name').skip(6).limit(3));
	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().populate('subcategories').sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	view.on('init', function (next) {

		if (req.params.category && req.params.subcategory) {
			keystone.list('PostSubCategory').model.findOne({ key: locals.filters.subcategory }).exec(function (err, result) {
				locals.data.subcategory = result;
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});


	/*view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}
			locals.data.currentcategories = results;
			console.log(locals.data.currentcategories);
			// Load the counts for each category
			async.each(locals.data.currentcategories, function (currentcategory, next) {

				keystone.list('Post').model.count().where('categories').in([currentcategory.id]).exec(function (err, count) {
					currentcategory.postCount = count;
					next(err);
					console.log(count);
				});

			}, function (err) {
				next(err);
			});
		});
	});
	*/



	// Load the posts
	view.on('init', function (next) {

		if (locals.data.category && locals.data.subcategory) {
			var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 18,
				maxPages: 5,
				filters: {
					state: 'Опубликовать',
					articl: true,
					subcategory: locals.data.subcategory
				},
			})
				.sort('-publishedDate')
				.populate('author categories');
		} else if (locals.data.category) {
			var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 18,
				maxPages: 5,
				filters: {
					state: 'Опубликовать',
					articl: true,
					categories: locals.data.category
				},
			})
				.sort('-publishedDate')
				.populate('author categories');
		}
		 else {

			var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 18,
				maxPages: 5,
				filters: {
					state: 'Опубликовать',
					articl: true
				},
			})
				.sort('-publishedDate')
				.populate('author categories');

		}

				if (locals.data.category && locals.data.subcategory) {
					q.where('subcategory').in([locals.data.subcategory]);
					q.where('categories').in([locals.data.category]);
				}else if (locals.data.category) {
					q.where('categories').in([locals.data.category]);
				}



			q.exec(function (err, results) {
				locals.data.posts = results;
				next(err);
			});
	});

	// Render the view
	view.render('article');
};
