#!/usr/bin/env node

const fs = require("fs-extra");
const Handlebars = require("handlebars");
const moment = require("moment");
const RenderPDF = require("chrome-headless-render-pdf");

// Disable this to speed up incremental builds
const PDF = true;

function render(resume) {
	const css = fs.readFileSync(__dirname + "/data/style.css", "utf-8");
	const icons = fs.readFileSync(__dirname + "/data/icons.css", "utf-8");
	const tpl = fs.readFileSync(__dirname + "/data/resume.hbs", "utf-8");

	resume = resume || JSON.parse(fs.readFileSync(__dirname + "/data/resume.json", "utf8"));

	// Use UI.registerHelper..
	Handlebars.registerHelper("date", (datetime, format) => moment(datetime).format("MMMM YYYY"));

	return Handlebars.compile(tpl)({
		css: css,
		icons: icons,
		resume: resume
	});
}

function build() {
	console.log("Exporting HTML resume to: " + process.cwd() + "/public/index.html");

	var resume;
	if (process.argv.length > 2) {
		resume = JSON.parse(fs.readFileSync(__dirname + "/" + process.argv[2], "utf8"));
	}

	fs.writeFileSync(process.cwd() + "/public/index.html", render(resume));
	fs.copySync("data/fonts", "public/fonts");

	if (PDF) {
		console.log("Exporting PDF resume to: " + process.cwd() + "/public/Andrew McOlash.pdf");
		RenderPDF.generateSinglePdf("file://" + process.cwd() + "/public/index.html", "public/Andrew McOlash.pdf");
	}
}

// Let's just always build things when run
build();

module.exports = {
	render: render,
	build: build
};
