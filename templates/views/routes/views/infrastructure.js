var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'infrastructure';
	locals.filters = {
		sport: req.originalUrl
	};

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	// Load the galleries by sortOrder
	view.query('infrastructure', keystone.list('Infrastructure').model.find());

	if (locals.filters.sport === '/infrastructure/gostinnyi-dom') {
		locals.title = 'Инфраструктура | Гостинный дом';
    view.query('infrastructuredom', keystone.list('Infrastructure').model.find().where('state', ['Гостинный дом']));
  } else if (locals.filters.sport === '/infrastructure/kafe-bar-overtaim') {
		locals.title = 'Инфраструктура | Кафе-бар «Овертайм»';
    view.query('infrastructurebar', keystone.list('Infrastructure').model.find().where('state', ['Кафе-бар']));
  }

	// Render the view
	view.render('infrastructure');

};
