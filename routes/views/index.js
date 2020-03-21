var keystone = require('keystone');
var async = require('async');
var moment = require('moment');
var API_KEY = 'e491b43abbd935ff964373593a96a985-87cdd773-8b0b2e85';
var DOMAIN = 'sandboxfe36e0fc9e28432c9464d3f52a713b5b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.

	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
		subcategory: req.params.subcategory,
	};
	locals.data = {
		categories: [],
		posts: [],
		bignews: [],
		smallnews: [],
		othernews: [],
		afishaIndex: []
	};

	locals.title = 'Бобр Дети - Портал Бобруйска для всей семьи | Главная';
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());
	view.query('reklama', keystone.list('Reklama').model.find().where('state', 'Опубликовать').sort('sort'));
	view.query('social', keystone.list('Social').model.find());
	view.query('Postcountresult', keystone.list('Post').model.find().where('news', true).where('state', 'Опубликовать'));
	view.query('postCategory1', keystone.list('PostCategory').model.find().sort('name').limit(3));
	view.query('postCategory2', keystone.list('PostCategory').model.find().sort('name').skip(3).limit(3));
	view.query('postCategory3', keystone.list('PostCategory').model.find().sort('name').skip(6).limit(3));
	// Load all categories


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

	view.on('init', function (next) {
		var q = Post.model.find().where('hotnews', true).sort('-publishedDate').where('state', 'Опубликовать').populate('rubrics').limit(1);
		q.exec(function (err, results) {

			locals.bignews = results;

			next(err);
		});
	});

	view.on('init', function (next) {
		var q = Post.model.find().where('news', true).where('hotnews', false).where('state', 'Опубликовать').sort('-publishedDate').populate('rubrics').skip(2).limit(2);
		q.exec(function (err, results) {

			locals.othernews = results;

			next(err);
		});
	});

	view.on('init', function (next) {
		var q = Post.model.find({
			hotnews: false,
			state: 'Опубликовать',
			news: true,
			afisha: false,
			articl: false
		}).sort('-publishedDate').skip(4).limit(3);
		q.exec(function (err, results) {

			locals.othernewsmenu = results;

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
		var q = Post.model.find().where('news', true).where('hotnews', false).where('state', 'Опубликовать').sort('-publishedDate').populate('rubrics').limit(2);
		q.exec(function (err, results) {

			locals.smallnews = results;
			next(err);
		});
	});

	view.on('init', function (next) {

		var q = keystone.list('Post').model.find({
			articl: true,
			state: 'Опубликовать'
		})
			.sort('-publishedDate')
			.limit(30)
			.populate('categories');
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

	view.on('init', function (next) {

		keystone.list('Rubric').model.find().sort('-publishedDate').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('rubrics').in([category.id]).exec(function (err, count) {
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

	// Load the current category filter
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().exec(function (err, result) {
			locals.data.category = result;
			// Load the counts for each category
			async.each(locals.data.category, function (categoris, next) {


				keystone.list('Post').model.count().where('categories').in([categoris.id]).exec(function (err, count) {
					categoris.articlCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});

	});

	// Load the current category filter
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().exec(function (err, result) {
			locals.data.categorymenu = result;
			next(err);
		});
	});

	// Load the posts
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
	// Render the view
	view.render('index');
};
