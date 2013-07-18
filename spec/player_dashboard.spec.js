var Browser = require("zombie");
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("Player dashboard", function() {

	var server = new Server(serving('public'));
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player does not exist", function() {

		it("simply notifies that this player is unknown", function(done) {
			var browser = new Browser();
			browser.visit("http://localhost:5000/players/ericminio").
				then(function() {
					expect(browser.text('#info')).toEqual("Unknown player");
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		
	});
	
});