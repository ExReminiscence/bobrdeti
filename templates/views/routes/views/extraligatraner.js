var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'extraligatraner';
	locals.filters = {
		liga: req.originalUrl
	};

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	if (locals.filters.liga === '/extraliga/trainers') {
		locals.title = 'Экстралига | Тренерский состав';
    view.query('extraligatraner', keystone.list('ExtraligaTrener').model.find().where('state', ['Экстра лига']).sort('sort'));
  } else if (locals.filters.liga === '/majorleague/trainers') {
		locals.title = 'Высшая лига | Тренерский состав';
  	view.query('extraligatraner2', keystone.list('ExtraligaTrener').model.find().where('state', ['Высшая лига']).sort('sort'));
  }

	// Render the view
	view.render('extraligatraner');

};
