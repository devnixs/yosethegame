var Chooser = require('./lib/power.of.two.chooser');
var array = require('../../../utils/lib/array.utils');

describe('Power of two chooser', function() {

	var chooser = new Chooser();
	
	it('chooses a power-of-two number', function() {
		var number = chooser.getNumber();

		expect(array.firstItemIn([2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048], function(item) {
			return item == number;
		})).toBeDefined();
	});
	
	it('chooses randomly', function() {
		var remainingAttempt = 5;
		var first = chooser.getNumber();
		var different = false;
		while (remainingAttempt > 0) {
			remainingAttempt --;
            different = different || (chooser.getNumber() !== first);
		}
		
		expect(different).toEqual(true);
	});
	
});