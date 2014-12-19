var pg      = require('pg');
var array   = require('../utils/lib/array.utils');

function PostgreSql(url) {
	this.url = url;	
}

PostgreSql.prototype.createPlayer = function(player, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select count(1) from players where login = $1";
		client.query(sql, [player.login], function(err, result) {
			var count = result.rows[0].count;
			if (parseInt(count) === 0) {
				player.score = 0;
				sql = "insert into players(login, json, score, creation_date) values($1, $2, 0, now())";
				client.query(sql, [player.login, JSON.stringify(player)], function(err, result) {
					client.end();
					callback();
				});
			} else {
				client.end();
				callback();
			}
		});
		
	});
};

PostgreSql.prototype.find = function(login, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select json from players where login = $1";
		client.query(sql, [login], function(err, result) {
			client.end();
			if (result && result.rows[0]) {
				callback(JSON.parse(result.rows[0].json));
			} else {
				callback(undefined);
			}
		});
	});
};

PostgreSql.prototype.savePlayer = function(player, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "update players set score = $1, json = $2 where login = $3";
		client.query(sql, [player.score, JSON.stringify(player), player.login], function(err, result) {
			client.end();
			callback();
		});
	});
};

PostgreSql.prototype.allPlayers = function(callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select login, score, json from players order by score desc limit 10";
		client.query(sql, function(err, result) {
			client.end();
			var players = [];
			if (result !== undefined) {
				array.forEach(result.rows, function(row) {
					players.push(JSON.parse(row.json));
				});
			}
			callback(players);
		});
	});
};

PostgreSql.prototype.playerCount = function(callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select count(1) as count from players";
		client.query(sql, function(err, result) {
            var count = result.rows[0].count;
			client.end();
			callback(parseInt(count));
		});
    });
};

PostgreSql.prototype.getScoreCommunity = function(callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select sum(score) from players";
		client.query(sql, function(err, result) {
            var sum = result.rows[0].sum;
			client.end();
			callback(parseInt(sum));
		});
    });
};

PostgreSql.prototype.findPlayersMatching = function(criteria, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select login, json from players where json like $1 order by score desc";
		client.query(sql, ['%' + criteria + '%'], function(err, result) {
			client.end();
			var players = [];
			if (result !== undefined) {
				array.forEach(result.rows, function(row) {
					players.push(JSON.parse(row.json));
				});
			}
			callback(players);
		});
    });
};

PostgreSql.prototype.addNews = function(news, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		sql = "insert into news(date, json) values(now(), $1)";
		client.query(sql, [JSON.stringify(news)], function(err, result) {
			client.end();
			callback();
		});
	});
};

PostgreSql.prototype.getNews = function(callback) {
    client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select date, json from news order by date desc limit 10";
		client.query(sql, function(err, result) {
			client.end();
			var news = [];
			if (result !== undefined) {
				array.forEach(result.rows, function(row) {
                    var line = JSON.parse(row.json);
                    line.date = row.date;
					news.push(line);
				});
			}
			callback(news);
		});
	});
};

module.exports = PostgreSql;