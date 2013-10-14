var InMemoryDatabase = require('./inMemoryDatabase');

function Example() {
	this.worlds = [
		{
			name: 'world 1',
			levels: [ 
				{
					id: 1,
					title: 'the first challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 2,
					title: 'the second challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
			]
		},
		{
			name: 'world 2',
			levels: [ 
				{
					id: 3,
					title: 'the third challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 4,
					title: 'the fourth challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 5,
					title: 'the fifth challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
			]
		}
	];
	
	this.levels = [
		{ 
			number: 1,
			name: 'The first level',
			challenges: [ 
				{ 
					title: 'challenge 1.1',
					file: 'public/challenge.ping/ping.html',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				}, 
				{ 
					title: 'challenge 1.2', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				} 
			]
		},
		{ 
			number: 2,
			name: 'The second level',
			challenges: [ 
				{ 
					title: 'challenge 2.1', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				}, 
				{ 
					title: 'challenge 2.2', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				} 
			]
		}
	];
};

Example.prototype = new InMemoryDatabase();

module.exports = Example;