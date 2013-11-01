var Requester = require('../../../public/world.prime.factors/challenge.decomposition/decomposition.requester');
var array = require('../../../public/js/utils/array.utils');

describe('Decomposition Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('has a number chooser choosing a positive integer > 1', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(1);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 300; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=300');
	});
		
});