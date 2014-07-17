var matcher = require('./lib/power.of.two.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');

describe('Power of two challenge challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a dynamic json challenge', function() {
		failsAnswering('***?number=42').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=42').whenTheHeaderIsNotApplicationJson(matcher);
		failsAnswering('***?number=42').whenTheResponseIsNotInJsonFormat(matcher);
	});
	
});