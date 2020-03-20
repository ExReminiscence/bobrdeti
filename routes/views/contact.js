var keystone = require('keystone');


exports = module.exports = function (req, res) {
	view.query('social', keystone.list('Social').model.find());
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	view.query('postCategoryMenu', keystone.list('Rubric').model.find());

	// On POST requests, add the Enquiry item to the database

	view.render('post');
};
