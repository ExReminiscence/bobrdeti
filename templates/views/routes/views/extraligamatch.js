var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'extraligamatch';
	locals.filters = {
		liga: req.originalUrl
	};

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	// Load the galleries by sortOrder
	if (locals.filters.liga === '/extraliga/match') {
		locals.title = 'Экстралига | Матчи';
    view.query('extraligamatch', keystone.list('ExtraligaMatch').model.find().where('state', ['Экстра лига']).sort('-publishedDate'));
  } else if (locals.filters.liga === '/majorleague/match') {
		locals.title = 'Высшая лига | Матчи';
  	view.query('extraligamatch2', keystone.list('ExtraligaMatch').model.find().where('state', ['Высшая лига']).sort('-publishedDate'));
  }


	// Render the view
	view.render('extraligamatch');

};
