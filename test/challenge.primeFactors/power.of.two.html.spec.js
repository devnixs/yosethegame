var cheerio = require('cheerio');

describe("power.of.two.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./public/challenge.primeFactors/power.of.two.html').toString());
	});
	
	describe("page's element", function() {
		

	});
	
		
});