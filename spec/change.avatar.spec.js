var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Change avatar:", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'annessou',
				avatar: 'http://old-avatar'
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player modify its avatar and comes back to his dashboard,", function() {
		
		beforeEach(function(done) {
			var browser = Browser.create();
			browser.visit('http://localhost:5000/players/annessou').
				then(function() {
					return browser.clickLink('#settings-link');
				}).
				then(function() {
					browser.fill('#avatar-url', 'http://new-avatar').pressButton('#save-settings-button');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('sees his new avatar', function(done) {
			var browser = Browser.create();
			browser.visit('http://localhost:5000/players/annessou').
				then(function() {
					expect(browser.query("#avatar").src).toEqual('http://new-avatar/');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe('avatar preview', function() {
	   
	   it('is updated when the user changes its value', function(done) {
			var browser = Browser.create();
			browser.visit('http://localhost:5000/players/annessou').
				then(function() {
					return browser.clickLink('#settings-link');
				}).
				then(function() {
					return browser.fill('#avatar-url', 'http://new-avatar');
				}).
				then(function() {
					expect(browser.query("#avatar-preview").src).toEqual('http://new-avatar/');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
	   });
	   
	});
	
		
});
		
		
