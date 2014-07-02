var matcher = require('./lib/first.fire.response.matcher');

var failWhenTheAnswer = require('../challenge.common/fail.when.the.answer');
var failWhenTheHeader = require('../challenge.common/fail.when.the.header');
var failWhenTheRemoteResponse = require('../challenge.common/fail.when.the.remote.response');

describe('First fire response matcher,', function() {
	
	it('makes format-related verifications of the answer', function() {
		failWhenTheAnswer.doesNotContainTheSentMap(matcher);
		failWhenTheAnswer.doesNotContainAMap(matcher);
		failWhenTheAnswer.isNull(matcher);
		failWhenTheAnswer.isNotAJsonObject(matcher);
	});
	
	it('makes header-related verifications', function() {
		failWhenTheHeader.isNotApplicationJson(matcher);
	});
	
	it('makes remote-response-related verifications', function() {
		failWhenTheRemoteResponse.isUndefined(matcher);
		failWhenTheRemoteResponse.hasStatusCodeOtherThan200(matcher);
	});
});