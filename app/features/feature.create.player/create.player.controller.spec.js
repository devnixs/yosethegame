var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
require('./lib/create.player.controller');

describe('Create player listener:', function() {
	
	describe('Request sent', function() {
		
    	var create;
	
		beforeEach(function() {
            create = new CreatePlayerController($);
			$('body').append('<input id="login" />');
			$('body').append('<input id="avatar" />');
		});

		afterEach(function() {
			$('#login').remove();
			$('#avatar').remove();
		});

		it("send a post request with the player's infos", function() {
			$('#login').val('eric');
			$('#avatar').val('avatar-of-eric');
			spyOn($, 'post').andCallThrough();
			create.player();

			expect($.post).toHaveBeenCalledWith('/create-player', { login: 'eric', avatar: 'avatar-of-eric' }, create.success);
		});
		
        it('does not send the request when the login is not correct', function() {
			$('#login').val('eric mignot');
			$('#avatar').val('avatar-of-eric');
			spyOn($, 'post').andCallThrough();
			create.player();

            expect($.post).not.toHaveBeenCalled();
        });
	});
	
	describe('Login correctness', function() {
	
    	var create;
	
		beforeEach(function() {
            create = new CreatePlayerController($);
			$('body').append('<input id="login" />');
		});

		afterEach(function() {
			$('#login').remove();
		});

        it('is not correct when empty', function() {
            $('#login').val('');

            expect(create.isLoginCorrect()).toEqual(false);
        });

        it('is correct with numbers and letters', function() {
            $('#login').val('eric42');

            expect(create.isLoginCorrect()).toEqual(true);
        });
        
        it('is correct with dashes', function() {
            $('#login').val('eric-mignot');

            expect(create.isLoginCorrect()).toEqual(true);
        });
        
        it('is correct with dots', function() {
            $('#login').val('eric.mignot');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is correct when it is an e-mail', function() {
            $('#login').val('eric.mignot@gmail.com');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is incorrect when not matching expected pattern', function() {
            $('#login').val('2&é""');

            expect(create.isLoginCorrect()).toEqual(false);
        });
	});
	
	describe('Success', function() {
		
    	var create;
	
		beforeEach(function() {
            create = new CreatePlayerController($);
			$('body').append( '' +
				'<input id="login" />' +
				'<section id="feedback" class="hidden" >' +
					'<a id="player-dashboard" href="" />' +
				'</section>'
			);
		});

		afterEach(function() {
			$('#player-dashboard').remove();
			$('#feedback').remove();
			$('#login').remove();
		});
		
		it('makes visible the feedback section', function() {
			create.success();
			
			expect($('#feedback').attr('class')).toContain('visible');
		});

		it('sets the dashboard link', function() {
			$('#login').val('bilou');
			create.success();
			
			expect($('a#player-dashboard').attr('href')).toEqual('/players/bilou');
		});
	});
		
});