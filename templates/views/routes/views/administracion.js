var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'administracion';
  locals.filters = {
		administracion: req.originalUrl
	};



	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

  if (locals.filters.administracion === '/hk-bobruisk/administracion') {
		locals.title = 'Администрация';
    view.query('hkadministrator', keystone.list('Hkadministrator').model.find().where('state', ['Администрация']).sort('sort'));
  } else if (locals.filters.administracion === '/hk-bobruisk/trade-union-committee') {
		locals.title = 'Профсоюзный комитет';
    view.query('hkcommittee', keystone.list('Hkadministrator').model.find().where('state', ['Профсоюзный комитет']));
  } else if (locals.filters.administracion === '/hk-bobruisk/job-openings') {
		locals.title = 'Вакансии';
    view.query('hkjob', keystone.list('Hkadministrator').model.find().where('state', ['Вакансии']));
  };

	// Render the view
	view.render('administracion');

};
