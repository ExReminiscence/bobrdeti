var keystone = require('keystone');
var Post = keystone.list('Post');
var API_KEY = '486b068826a324a87963b1baaba339c4-f8faf5ef-61a4c0ca';
var DOMAIN = 'sandbox5f184d85486a406fa79a2a7520007665.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
var PostComment = keystone.list('PostComment');
var random = require('mongoose-simple-random');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
		category: req.params.category,
		subcategory: req.params.subcategory,
	};
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());
	locals.data = {
		posts: [],
		readAlso: [],
		comments: [],
		fishaIndex: []
	};
	locals.formData = req.body;

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

	view.query('reklama', keystone.list('Reklama').model.find().where('state', 'Опубликовать').sort('sort'));
	view.query('social', keystone.list('Social').model.find());

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
	      from: 'Новый подписчик на bobrdeti.by <info@bobrdeti.by>',
	      to: 'info@bobrdeti.by',
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

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'Опубликовать',
			slug: locals.filters.post,
		})
		.populate('author categories');
		if (locals.data.category && locals.data.subcategory) {
			q.where('subcategory').in([locals.data.subcategory]);
			q.where('categories').in([locals.data.category]);
		}else if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, result) {
			locals.data.post = result;

			if (result.ceo.desctiption) {
				locals.desctiption = result.ceo.desctiption;
			} else {
				locals.desctiption = result.kratkoe;
			}

			if (result.ceo.title) {
				locals.title = result.ceo.title;
			} else {
				locals.title = result.title;
			}

			console.log(locals.desctiption);
			var cnt = locals.data.post.view;
			function cl(){
				return ++cnt;
			};
			keystone.list('Post').model.findOneAndUpdate({ slug: locals.filters.post }, { $set: { view: cl() } }, { new: true }, function(err, doc) {
				if (err) {
					console.log('не удалось добавить просмотр!');
				}
				console.log('Добавлен просмотр');
			});
			next(err);
		});

	});

	var countNews;
	view.on('init', function (next) {
		Post.model.find()
		.where('state', 'Опубликовать')
		.where('news', true)
		.sort('-publishedOn')
		.count()
		.exec(function (err, results) {
			countNews = results;
			next(err);
		});
	});

	// Load other posts
		view.on('init', function (next) {

			var random1 = Math.floor(Math.random() * countNews);
			if(countNews <= 3){
				random1 = 0;
			}
			else if (countNews > 3 && countNews < 4 ){
				random1 = 1;
			} else if (countNews > 4 && countNews < 5){
				random1 = 2;
			} else if (countNews > 5 && countNews < 6){
				random1 = 3;
			}

			if((countNews - random1) < 3){
				random1=random1-3;
			}

			var q = Post.model.find().where('state', 'Опубликовать').where('news', true).skip(random1).limit(3);

			q.exec(function (err, results) {

				locals.readAlso = results;
				next(err);
			});
		});

		view.query('posts', keystone.list('Post').model.find().where('state', 'Опубликовать').where('news', true).limit(3).sort('-view'));


	// Render the view
	view.render('post');
};
