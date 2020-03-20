var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'service';
	locals.filters = {
		sport: req.originalUrl
	};

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

  if (locals.filters.sport === '/service/raspisanie') {
    view.query('serviceraspisanie', keystone.list('Service').model.find().where('state', ['Расписание']));
  } else if (locals.filters.sport === '/service/arenda') {
		locals.title = 'Аренда';
    view.query('servicearenda', keystone.list('Service').model.find().where('state', ['Аренда']));
  } else if (locals.filters.sport === '/service/sbori') {
		locals.title = 'Сборы';
    view.query('servicesbori', keystone.list('Service').model.find().where('state', ['Сборы']));
  } else if (locals.filters.sport === '/service/organizator') {
		locals.title = 'Организаторам мероприятий';
    view.query('serviceorganizator', keystone.list('Service').model.find().where('state', ['Организаторам мероприятий']));
  }

	// Render the view
	view.render('service');
};
