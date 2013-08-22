var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');

describe("Power of two challenge", function() {

	var server = new Server(new Router());
	var powerOfTwoChallengePage = "http://localhost:5000/challenge.primeFactors/power.of.two.html";
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("when the remote server is up and responds the expected answer", function() {
		
		var remote;
		var correctAnswer = JSON.stringify({ 
				number: 4,
				decomposition: [2, 2]
			});

		beforeEach(function() {
			var powerOfTwo = require('../public/challenge.primeFactors/power.of.two.js');
			powerOfTwo.numberToAskDecompositionFor = function() { return 4; };
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.write(correctAnswer);
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});

		it("you pass the level", function(done) {
			var browser = new Browser();
			browser.visit(powerOfTwoChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.query("#success_section").className).toContain('visible');
					done();
				}).
				then(function() {
					expect(browser.text("#success_section")).toContain(correctAnswer);
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});		
		
	});
	
	describe("when the remote server is up and does respond the expected answer", function() {
		
		var remote;
		var incorrectAnswer = 'anything but the correct answer'

		beforeEach(function() {
			var powerOfTwo = require('../public/challenge.primeFactors/power.of.two.js');
			powerOfTwo.numberToAskDecompositionFor = function() { return 4; };
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.write(incorrectAnswer);
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});

		it("you fail the level and are notified that your server does not implement the feature", function(done) {
			var browser = new Browser();
			browser.visit(powerOfTwoChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.query("#success_section").className).toContain('hidden');
					done();
				}).
				then(function() {
					expect(browser.query("#error_section").className).toContain('visible');
					done();
				}).
				then(function() {
					expect(browser.text("#error")).toContain('501');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});		
		
	});
	
	describe("when the remote server is down", function() {
		
		it("you fail the level and are notified that your server is not responding", function(done) {
			var browser = new Browser();
			browser.visit(powerOfTwoChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#error")).toContain('404');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});
});
		
		