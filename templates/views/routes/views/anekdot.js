var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'anekdot';

	locals.title = 'Анекдоты | Афоризмы';


	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('anekdot', keystone.list('Anekdot').model.find());

	// Render the view
	view.render('anekdot');

};
