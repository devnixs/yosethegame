var PSql        = require('./psql.database');
var array       = require('../utils/lib/array.utils');
var withValue   = require('../utils/lib/array.matchers');
var thisPlayer  = require('./player.utils');

var isWorldOpenFor = function(player) {
    var open = false;
    array.forEach(this.levels, function(level) {
        if (level.isOpenLevelFor(player)) { open = true; }
    });
    return open;
};

function ProductionDatabase() {
    self = this;
    
    this.worlds = [
    {
        name: 'Start',
        isOpenFor: isWorldOpenFor,
        levels: [ 
            {
                id: 25,
                title: 'First Web page',
                file: 'app/challenges/challenge.hello.yose/lib/hello.yose.html',
                requester: '../../../challenges/challenge.hello.yose/lib/hello.yose.requester.js',
                checker: '../../../challenges/challenge.hello.yose/lib/hello.yose.response.matcher.js',
                isOpenLevelFor: function(player) { return true; }
            },
            {
                id: 1,
                title: 'First Web service',
                file: 'app/challenges/challenge.ping/lib/ping.html',
                requester: '../../../challenges/challenge.ping/lib/ping.requester.js',
                checker: '../../../challenges/challenge.ping/lib/ping.response.matcher.js',
                isOpenLevelFor: function(player) { return true; }
            },
            {
                id: 14,
                title: 'Share',
                file: 'app/challenges/challenge.share//lib/share.html',
                requester: '../../../challenges/challenge.share/lib/share.requester.js',
                checker: '../../../challenges/challenge.share/lib/share.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneOneOfThoseLevelsWithId(player, [25, 1]); }
            }
        ]
    },
    {
        name: 'Portfolio',
        isOpenFor: isWorldOpenFor,
        levels: [ 
            {
                id: 22,
                title: 'Contact information',
                file: 'app/challenges/challenge.contact/lib/contact.html',
                requester: '../../../challenges/challenge.landing.page/lib/landing.requester.js',
                checker: '../../../challenges/challenge.contact/lib/contact.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 25); }
            },
            {
                id: 21,
                title: 'Portfolio - Ping',
                file: 'app/challenges/challenge.landing.page/lib/landing.html',
                requester: '../../../challenges/challenge.landing.page/lib/landing.requester.js',
                checker: '../../../challenges/challenge.landing.page/lib/landing.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 1); }
            },
            {
                id: 23,
                title: 'Portfolio - Prime factors',
                file: 'app/challenges/world.prime.factors/challenge.portfolio/lib/portfolio.html',
                requester: '../../../challenges/challenge.landing.page/lib/landing.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.portfolio/lib/portfolio.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 13); }
            },
            {
                id: 27,
                title: 'Portfolio - Minesweeper',
                file: 'app/challenges/world.minesweeper/challenge.portfolio/lib/portfolio.html',
                requester: '../../../challenges/challenge.landing.page/lib/landing.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.portfolio/lib/portfolio.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 26); }
            },      
            {
                id: 37,
                title: 'Portfolio - Astroport',
                file: 'app/challenges/world.astroport/challenge.portfolio/lib/portfolio.html',
                requester: '../../../challenges/challenge.landing.page/lib/landing.requester.js',
                checker: '../../../challenges/world.astroport/challenge.portfolio/lib/portfolio.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 36); }
            },      
        ]
    },
    {
        name: 'Prime factors',
        isOpenFor: isWorldOpenFor,
        levels: [
            {
                id: 2,
                title: 'Power of two',
                file: 'app/challenges/world.prime.factors/challenge.power.of.two/lib/power.of.two.html',
                requester: '../../../challenges/world.prime.factors/challenge.power.of.two/lib/power.of.two.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.power.of.two/lib/power.of.two.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 1); }
            },
            {
                id: 3,
                title: 'String guard',
                file: 'app/challenges/world.prime.factors/challenge.guard.string/lib/guard.html',
                requester: '../../../challenges/world.prime.factors/challenge.guard.string/lib/guard.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.guard.string/lib/guard.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 2); }
            },
            {
                id: 4,
                title: 'Decomposition',
                file: 'app/challenges/world.prime.factors/challenge.decomposition/lib/decomposition.html',
                requester: '../../../challenges/world.prime.factors/challenge.decomposition/lib/decomposition.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.decomposition/lib/decomposition.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 3); }
            },
            {
                id: 7,
                title: 'Big number guard',
                file: 'app/challenges/world.prime.factors/challenge.guard.big.number/lib/big.number.html',
                requester: '../../../challenges/world.prime.factors/challenge.guard.big.number/lib/big.number.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.guard.big.number/lib/big.number.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 4); }
            },
            {
                id: 12,
                title: 'Multiple entries',
                file: 'app/challenges/world.prime.factors/challenge.multiple.entries/lib/multiple.entries.html',
                requester: '../../../challenges/world.prime.factors/challenge.multiple.entries/lib/multiple.entries.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.multiple.entries/lib/multiple.entries.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 7); }
            },
            {
                id: 5,
                title: 'Form',
                file: 'app/challenges/world.prime.factors/challenge.form/lib/form.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.form/lib/form.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 12); }
            },
            {
                id: 6,
                title: 'Input',
                file: 'app/challenges/world.prime.factors/challenge.input/lib/input.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.input/lib/input.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 5); }
            },
            {
                id: 8,
                title: 'Resist big number',
                file: 'app/challenges/world.prime.factors/challenge.resist.big.number/lib/resist.big.number.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.resist.big.number/lib/resist.big.number.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 6); }
            },
            {
                id: 9,
                title: 'Resist strings',
                file: 'app/challenges/world.prime.factors/challenge.resist.strings/lib/resist.strings.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.resist.strings/lib/resist.strings.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 8); }
            },
            {
                id: 10,
                title: 'Resist negative number',
                file: 'app/challenges/world.prime.factors/challenge.resist.negative/lib/resist.negative.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.resist.negative/lib/resist.negative.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 9); }
            },
            {
                id: 11,
                title: 'One page',
                file: 'app/challenges/world.prime.factors/challenge.one.page/lib/one.page.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.one.page/lib/one.page.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 10); }
            },
            {
                id: 13,
                title: 'List of decomposition',
                file: 'app/challenges/world.prime.factors/challenge.list.of.decomposition/lib/list.of.decomposition.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.list.of.decomposition/lib/list.of.decomposition.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 11); }
            },
            {
                id: 30,
                title: 'Roman decomposition',
                file: 'app/challenges/world.prime.factors/challenge.roman.decomposition/lib/roman.decomposition.html',
                requester: '../../../challenges/world.prime.factors/challenge.roman.decomposition/lib/roman.decomposition.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.roman.decomposition/lib/roman.decomposition.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 13); }
            },
            {
                id: 31,
                title: 'Persistence',
                file: 'app/challenges/world.prime.factors/challenge.persistence/lib/persistence.html',
                requester: '../../../challenges/world.prime.factors/challenge.form/lib/form.requester.js',
                checker: '../../../challenges/world.prime.factors/challenge.persistence/lib/persistence.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 13); }
            },
        ]
    },
    {
        name: 'Minesweeper',
        isOpenFor: isWorldOpenFor,
        levels: [
            {
                id: 15,
                title: 'Minesweeper board',
                file: 'app/challenges/world.minesweeper/challenge.board/lib/board.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.board/lib/board.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 25); }
            },
            {
                id: 17,
                title: 'Data injection',
                file: 'app/challenges/world.minesweeper/challenge.injection/lib/injection.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.injection/lib/injection.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 15); }
            },
            {
                id: 18,
                title: 'Safe cells',
                file: 'app/challenges/world.minesweeper/challenge.safe/lib/safe.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.safe/lib/safe.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 17); }
            },
            {
                id: 19,
                title: 'Zero mine around',
                file: 'app/challenges/world.minesweeper/challenge.zero/lib/zero.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.zero/lib/zero.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 18); }
            },
            {
                id: 20,
                title: 'Open field',
                file: 'app/challenges/world.minesweeper/challenge.open/lib/open.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.open/lib/open.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 19); }
            },
            {
                id: 24,
                title: 'Random grid',
                file: 'app/challenges/world.minesweeper/challenge.random/lib/random.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.random/lib/random.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 20); }
            },
            {
                id: 26,
                title: 'Suspect mode',
                file: 'app/challenges/world.minesweeper/challenge.suspect/lib/suspect.html',
                requester: '../../../challenges/world.minesweeper/challenge.board/lib/board.requester.js',
                checker: '../../../challenges/world.minesweeper/challenge.suspect/lib/suspect.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 24); }
            },      
        ]
    },
    {
        name: 'Fire',
        isOpenFor: isWorldOpenFor,
        levels: [
            {
                id: 28,
                title: 'First fire',
                file: 'app/challenges/world.fire/challenge.first.fire/lib/first.fire.html',
                requester: '../../../challenges/world.fire/challenge.first.fire/lib/first.fire.requester.js',
                checker: '../../../challenges/world.fire/challenge.first.fire/lib/first.fire.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 12); }
            },      
            {
                id: 29,
                title: 'Training',
                file: 'app/challenges/world.fire/challenge.get.water.fast/lib/get.water.fast.html',
                requester: '../../../challenges/world.fire/challenge.get.water.fast/lib/get.water.fast.requester.js',
                checker: '../../../challenges/world.fire/challenge.get.water.fast/lib/get.water.fast.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 28); }
            },      
            {
                id: 32,
                title: 'Emergency',
                file: 'app/challenges/world.fire/challenge.emergency/lib/emergency.html',
                requester: '../../../challenges/world.fire/challenge.emergency/lib/emergency.requester.js',
                checker: '../../../challenges/world.fire/challenge.emergency/lib/emergency.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 28); }
            },      
        ]
    },
    {
        name: 'Astroport',
        isOpenFor: isWorldOpenFor,
        levels: [      
            {
                id: 33,
                title: "Astroport name",
                file: 'app/challenges/world.astroport/challenge.name/lib/name.html',
                requester: '../../../challenges/world.astroport/challenge.name/lib/name.requester.js',
                checker: '../../../challenges/world.astroport/challenge.name/lib/name.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 25); }
            },      
            {
                id: 34,
                title: "Gates",
                file: 'app/challenges/world.astroport/challenge.gates/lib/gates.html',
                requester: '../../../challenges/world.astroport/challenge.gates/lib/gates.requester.js',
                checker: '../../../challenges/world.astroport/challenge.gates/lib/gates.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 33); }
            },      
            {
                id: 35,
                title: "Docker",
                file: 'app/challenges/world.astroport/challenge.docker/lib/docker.html',
                requester: '../../../challenges/world.astroport/challenge.docker/lib/docker.requester.js',
                checker: '../../../challenges/world.astroport/challenge.docker/lib/docker.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 34); }
            },      
            {
                id: 36,
                title: "Feedback",
                file: 'app/challenges/world.astroport/challenge.feedback/lib/feedback.html',
                requester: '../../../challenges/world.astroport/challenge.feedback/lib/feedback.requester.js',
                checker: '../../../challenges/world.astroport/challenge.feedback/lib/feedback.response.matcher.js',
                isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 35); }
            },      
        ]
    }
    
    ];  
}

ProductionDatabase.prototype = new PSql(process.env.DATABASE_URL);

module.exports = ProductionDatabase;
module.exports.isWorldOpenFor = isWorldOpenFor;
