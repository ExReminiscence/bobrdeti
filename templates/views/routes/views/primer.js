var keystone = require('keystone');
const fetch = require('node-fetch');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'primer';

	

  view.query('kontactmodel', keystone.list('Kontact').model.find());

	// Render the view
	view.render('primer');

};
