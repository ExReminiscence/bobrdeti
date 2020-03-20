var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'dushteam';
	locals.filters = {
		liga: req.originalUrl
	};

	locals.title = 'ДЮСШ - Команды';

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('dushcomand', keystone.list('DushComand').model.find().sort('sort'));

	// Render the view
	view.render('dushteam');

};
