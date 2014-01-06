var cheerio 	= require('cheerio');
var Data	 	= require('../support/database.with.levels');
var dashboard	= require('../../public/feature.dashboard/display.dashboard.js');
var response	= require('../support/fake.response');

describe('Restart world link', function() {
   
    var database;
    
    beforeEach(function() {
        database = new Data();
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
    });

	var loadDashboardOfPlayer = function(player) {
		database.players = [ player ];
		dashboard({ url: '/players/' + player.login }, response, database);
		
		return cheerio.load(response.html);
	};
	
	it('is displayed in world #1 when player has one achievement of world #1', function() {
 		var page = loadDashboardOfPlayer({
 			login: 'ericminio', 			
 			portfolio: [ { achievements: [database.worlds[0].levels[0].id] } ]
 		});
 		
        expect(page('#restart-world-1-link').attr('class')).toContain('visible');
	});
	
	it('is displayed in world #2 when player has one achievement of world #2', function() {
 		var page = loadDashboardOfPlayer({
 			login: 'ericminio', 			
 			portfolio: [ { achievements: [database.worlds[1].levels[0].id] } ]
 		});
 		
        expect(page('#restart-world-2-link').attr('class')).toContain('visible');
	});
	
	it('is not displayed in world #1 when player has no achievement of world #1', function() {
 		var page = loadDashboardOfPlayer({
 			login: 'ericminio', 			
 			portfolio: [ { achievements: [] } ]
 		});
 		
        expect(page('#restart-world-1-link').attr('class')).toContain('hidden');
	});
	
});