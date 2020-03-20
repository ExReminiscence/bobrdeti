var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'extraligacalendar';
	locals.filters = {
		liga: req.originalUrl
	};

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	// Load the galleries by sortOrder
	if (locals.filters.liga === '/extraliga/calendar') {
		locals.title = 'Экстралига | Календарь игр';
    view.query('extraligacalendar', keystone.list('ExtraligaCalendar').model.find().where('state', ['Экстра лига']));
  } else if (locals.filters.liga === '/majorleague/calendar') {
		locals.title = 'Высшая лига | Календарь игр';
  	view.query('extraligacalendar2', keystone.list('ExtraligaCalendar').model.find().where('state', ['Высшая лига']));
  }

	// Render the view
	view.render('extraligacalendar');

};
