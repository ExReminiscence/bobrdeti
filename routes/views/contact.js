var keystone = require('keystone');
var Post = keystone.list('Post');
var moment = require('moment');


exports = module.exports = function (req, res) {
	view.query('social', keystone.list('Social').model.find());
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());

	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().exec(function (err, result) {
			locals.data.categorymenu = result;
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
		})
			.sort('meetDate')
			.populate('sectionAfisha');

		var w = keystone.list('Post').model.find({
			state: 'Опубликовать',
			afisha: true,
			meetDatePostoyanno: {"$gte": datenow, "$lte": datenow}
		})
			.populate('sectionAfisha');

		if (locals.data.afisharubric) {
			console.log(locals.data.afisharubric);
			q.where('sectionAfisha').in([locals.data.afisharubric]);
			w.where('sectionAfisha').in([locals.data.afisharubric]);
		}

		q.exec(function (err, results) {
			//locals.data.posts = results;
			w.exec(function (error, res){
				res.forEach((arr, i) => {
					results.unshift(arr);
				});
				//console.log(results.results);
				locals.data.afishaIndex = results
				next(err);
			})
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

	// On POST requests, add the Enquiry item to the database

	view.render('post');
};
