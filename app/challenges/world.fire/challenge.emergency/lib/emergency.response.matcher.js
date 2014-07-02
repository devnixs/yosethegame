var extractMap = require('../../challenge.common/lib/extract.map');
var findCandidate = require('../../challenge.common/lib/find.candidate');

var firstFireMatcher = require('../../challenge.first.fire/lib/first.fire.response.matcher');

var matcher = {
	
	name : 'Emergency response matcher',

    validate: function(url, remoteResponse, content, callback) {

		var self = this;
		
		firstFireMatcher.validate(url, remoteResponse, content, function(status) {
			
			if (status.code != 200) {
				callback(status);
			}
			else {

				var sentMap = extractMap(url);
				var expectedMoveCount = findCandidate(url, self.candidates).expectedMoveCount;		
				var expectedMessage = expectedMoveCount + ' moves to minimize the flight to water and fire. map = ' + JSON.stringify(sentMap);

		        callback({
		            code: 200,
		            expected: expectedMessage,
		            got: 'You did it!'
				});
				
			}
		});

	}
};

var Requester = require('./emergency.requester');
matcher.candidates = new Requester().candidates;

module.exports = matcher;