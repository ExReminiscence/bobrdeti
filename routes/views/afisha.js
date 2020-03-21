var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post');
var moment = require('moment');
var API_KEY = 'e491b43abbd935ff964373593a96a985-87cdd773-8b0b2e85';
var DOMAIN = 'sandboxfe36e0fc9e28432c9464d3f52a713b5b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
		keywords: req.query.keywords,
		keywords2: req.query.keywords2,
		afisharubric: req.params.afisharubric,
	};
	locals.data = {
		date: [],
		posts: [],
		categories: [],
		afisharubrics: [],
		dosug: [],
		dosug2: [],
		keywords: "",
		keywords2: "",
		afishaIndex: []
	};
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());

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

	locals.title = 'Афиша';
	view.on('init', function (next) {
		var q = keystone.list('Post').model.find().where('news', true).where('hotnews', false).where('state', 'Опубликовать').sort('-publishedDate').populate('rubrics').skip(4).limit(3);
		q.exec(function (err, results) {

			locals.othernewsmenu = results;

			next(err);
		});
	});

	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().exec(function (err, result) {
			locals.data.categorymenu = result;
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

	view.on('get', { action: 'afishaDate' }, function(next) {
		locals.data.keywords = locals.filters.keywords;

		//search the full-text index
		keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 100,
			maxPages: 3,
			filters: {
				state: 'Опубликовать',
				afisha: true,
				publishedDate: locals.filters.keywords+" "
			},
		})
			.sort('-publishedDate')
			.exec(function(error, results) {

 				locals.data.date = results;
				next();
		});


 	});

	view.query('reklama', keystone.list('Reklama').model.find().where('state', 'Опубликовать').sort('sort'));
	view.query('social', keystone.list('Social').model.find());
	view.query('postCategory1', keystone.list('PostCategory').model.find().sort('name').limit(3));
	view.query('postCategory2', keystone.list('PostCategory').model.find().sort('name').skip(3).limit(3));
	view.query('postCategory3', keystone.list('PostCategory').model.find().sort('name').skip(6).limit(3));
	// Load all categories
	view.on('init', function (next) {

		keystone.list('AfishaRubric').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.afisharubrics = results;
			// Load the counts for each category
			async.each(locals.data.afisharubrics, function (afisharubrics, next) {

				keystone.list('Post').model.find({'state': 'Опубликовать'}).count().where('sectionAfisha').in([afisharubrics.id]).exec(function (err, count) {
					afisharubrics.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});

		});
	});


	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.afisharubrics) {
			keystone.list('AfishaRubric').model.findOne({ key: req.params.afisharubrics }).exec(function (err, result) {
				locals.data.afisharubric = result;
				next(err);
			});
		} else {
			next();

		}
	});

	// Load the posts
	view.on('init', function (next) {

		var datenow = moment().format('YYYY-MM-DD');

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 32,
			maxPages: 5,
			filters: {
				state: 'Опубликовать',
				afisha: true,
				meetDate: {"$gte": datenow}
			}
		})
			.sort('meetDate')
			.populate('sectionAfisha');

			if (locals.data.afisharubric) {
				q.where('sectionAfisha').in([locals.data.afisharubric]);
			}


		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('afisha');
};
