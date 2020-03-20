var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'dush';
  locals.filters = {
		administracion: req.originalUrl
	};

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

  if (locals.filters.administracion === '/dush/administracion') {
		locals.title = 'ДЮСШ - Администрация';
    view.query('dushadministracion', keystone.list('Dush').model.find().where('state', ['Администрация']).sort('sort'));
  } else if (locals.filters.administracion === '/dush/calendar') {
		locals.title = 'ДЮСШ - Календарь игр';
    view.query('dushcalendar', keystone.list('Dush').model.find().where('state', ['Календарь игр']));
  } else if (locals.filters.administracion === '/dush/nabor') {
		locals.title = 'ДЮСШ - Набор в ДЮСШ';
    view.query('dushnabor', keystone.list('Dush').model.find().where('state', ['Набор в ДЮСШ']));
  } else if (locals.filters.administracion === '/dush/normativ-pravo') {
		locals.title = 'ДЮСШ - Номативно-правовая база';
    view.query('dushpravo', keystone.list('Dush').model.find().where('state', ['Номативно-правовая база']));
  } else if (locals.filters.administracion === '/dush/behavior-rules') {
		locals.title = 'ДЮСШ - Правила поведения';
    view.query('dushrules', keystone.list('Dush').model.find().where('state', ['Правила поведения']));
  };

	// Load the galleries by sortOrder


  view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	// Render the view
	view.render('dush');

};
