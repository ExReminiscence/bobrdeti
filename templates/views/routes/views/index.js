var keystone = require('keystone');
var Weather = keystone.list('Weather');
var Standings = keystone.list('Standings');
var needle = require('needle');
var cheerio = require('cheerio');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Render the view


	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.title = 'Бобруйск Арена | Хоккейный клуб "Бобруйск"';

	view.query('postHkMain', keystone.list('Post').model.where('categories', ['5d611af068c45621f80b98ad']).find().limit(1).sort('-publishedDate'));


	view.on('get',  function(next){
		 keystone.list('Post').model.find({
			categories: '5d611af068c45621f80b98ad'
	 	}).sort('-publishedDate').limit(3).skip(1).exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.postHkOther = results;
			next();
		});
	});

	view.query('postHkBobr', keystone.list('Post').model.where('categories', ['5d611afc68c45621f80b98ae']).find().limit(1).sort('-publishedDate'));

	view.query('postHkBobrOther', keystone.list('Post').model.where('categories', ['5d611afc68c45621f80b98ae']).find().limit(3).skip(1).sort('-publishedDate'));

	view.query('postHkNews', keystone.list('Post').model.where('categories', ['5d611b0668c45621f80b98af']).find({
		state: 'Парсер новости'
	}).limit(1).sort('-publishedDate'));

	view.query('postHkNewsOther', keystone.list('Post').model.where('categories', ['5d611b0668c45621f80b98af']).find({
		state: 'Парсер новости'
	}).limit(3).skip(1).sort('-publishedDate'));

	view.query('postHkNewsSport', keystone.list('Post').model.where('categories', ['5d611b1068c45621f80b98b0']).find({
		state: 'Парсер новости'
	}).limit(1).sort('-publishedDate'));

	view.query('postHkNewsOtherSport', keystone.list('Post').model.where('categories', ['5d611b1068c45621f80b98b0']).find({
		state: 'Парсер новости'
	}).limit(3).skip(1).sort('-publishedDate'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('anekdot', keystone.list('Anekdot').model.find());

	view.query('online', keystone.list('Online').model.find());

	view.query('weather', keystone.list('Weather').model.find());

	view.query('match', keystone.list('ExtraligaMatch').model.find().sort('publishedDate'));

	view.query('standingsA', keystone.list('Standings').model.find({ _id: '5d70c250e628ac22b0579eeb' }));

	view.query('standingsB', keystone.list('Standings').model.find({ _id: '5d70c25ce628ac22b0579eec' }));

	view.query('standingsLiga', keystone.list('Standings').model.find({ _id: '5d70c268e628ac22b0579eed' }));

	view.query('reclam1', keystone.list('Reclam').model.find({ _id: '5d7385ef03f2c522ac93b24b' }).limit(1));

	view.query('reclam2', keystone.list('Reclam').model.find({ _id: '5d7385f503f2c522ac93b24c' }).limit(1));

	view.query('reclam3', keystone.list('Reclam').model.find({ _id: '5d7385fb03f2c522ac93b24d' }).limit(1));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

	view.query('birthday', keystone.list('Birthday').model.find().sort('-publishedDate'));

	view.query('reclamBanner', keystone.list('ReclamBanner').model.find().sort('sort'));

	view.query('partnerBanner', keystone.list('PartnerBanner').model.find().sort('sort'));

	view.query('reclamBlockTop', keystone.list('ReclamBlockTop').model.find().sort('sort'));

	view.render('index');
};
