var fs = require("fs");
var Handlebars = require("handlebars");
var utils = require('jsonresume-themeutils');

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

	resume = JSON.parse(fs.readFileSync(__dirname + '/resume.json', 'utf8'));

	utils.setConfig({ date_format: 'MMMM YYYY' });

	// Use UI.registerHelper..
	Handlebars.registerHelper("date", function (datetime, format) {
		return utils.getFormattedDate(datetime);
	});

	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
