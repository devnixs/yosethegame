var request = require('request');
var cheerio = require('cheerio');

var expected = "a page containing a#repository-link with href attribute AND a repository with a readme file containing 'YoseTheGame'";

var withError = function(message, callback) {
	callback({
		code: 501,
		expected: expected,
		got: message
	});				
};

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		request(url, function (error, response, body) {
			if (response === undefined) { return withError('Error1: 404', callback); } 
			if (response.statusCode !== 200) { return withError('Error2: ' + response.statusCode, callback); } 

			var page = cheerio.load(body);
			if (page('a#repository-link').length === 0) { return withError('Error: missing element a#repository-link', callback); }

			var repoUrl = page('a#repository-link').attr('href');
			if (repoUrl === undefined) { return withError('Error: missing element a#repository-link with href attribute', callback); }
			if (repoUrl === '') { return withError('Error: missing element a#repository-link with href attribute', callback); }
			request(repoUrl, function (repoError, repoResponse, repoBody) {
				if (repoResponse === undefined) { return withError('Error: 404 (repository)', callback); } 
				if (repoResponse.statusCode !== 200) { return withError('Error: ' + repoResponse.statusCode + ' (repository)',callback); } 
				var pageRepo = cheerio.load(repoBody);
				if (pageRepo('#readme').length === 0) { return withError('Error: missing element #readme', callback); }
				if (pageRepo('#readme').html().indexOf('YoseTheGame') == -1) { return withError("missing reference to 'YoseTheGame' in element #readme", callback); }

				callback({
					code: 200,
					expected: expected,
					got: expected,
				});
			});
		});	
	}
};