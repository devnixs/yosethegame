var matcher = require('./lib/first.fire.response.matcher');

var failWhenThePlane = require('../challenge.common/fail.when.the.plane');

describe('First fire response matcher,', function() {
    
	it('makes flight-related verifications', function() {
		failWhenThePlane.neverTakesWater(matcher);
		failWhenThePlane.neverReachesTheFire(matcher);
		failWhenThePlane.reachesTheFireBeforeTakingWater(matcher);
	});
});