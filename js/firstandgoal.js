var database;
var dice = {};
var team = {};
var teams = [];
var csv = "\"Base\",0,1,1,2,3,5,1,2,3,5,6,7,3,4,5,7,8,9,5,6,8,9,10,10,7,8,9,10,12,14,10,10,10,12,14,16,-5,-4,-3,-1,0,1\r\n\"Birmingham Black Widows\",-1,0,2,2,4,5,6,7,8,8,9,10,5,6,8,8,9,12,7,9,10,10,12,12,10,10,12,12,12,16,10,10,12,12,14,14,-3,-2,0,0,2,3\r\n\"Columbus Cobras\",2,3,4,4,5,6,4,5,6,6,7,8,2,3,3,4,5,7,2,4,6,6,8,10,6,7,8,8,9,10,10,10,12,12,14,14,-4,-4,-3,-3,1,1\r\n\"Scranton Scorchers\",-2,0,1,3,4,6,1,2,4,7,10,12,5,6,8,9,10,10,0,1,5,8,10,12,4,5,8,9,10,12,4,6,8,12,14,16,-4,-4,-3,-2,-1,2\r\n\"Toronto Thunder\",-8,-5,-2,2,5,8,-2,0,2,3,9,12,-2,-1,5,8,12,14,-4,-3,2,7,10,12,0,2,3,7,10,14,1,2,6,9,14,16,-12,-10,-6,-1,1,4\r\n\"Knoxville Knights\",1,2,4,6,9,14,-2,0,3,9,12,14,7,8,9,10,12,14,2,2,3,5,6,6,9,9,12,12,14,16,8,10,12,16,18,20,-2,-2,-1,0,1,4\r\n\"Louisville Locusts\",-3,-1,1,1,5,9,0,2,3,4,7,8,5,9,10,10,12,14,7,9,10,12,16,18,10,10,12,14,18,20,8,10,12,16,18,20,-6,-5,-2,0,5,8\r\n\"Milwaukee Monsters\",-6,-5,-2,0,4,9,-6,-5,0,4,9,10,2,3,6,9,12,16,8,9,10,10,11,12,10,10,12,12,12,16,10,10,12,12,14,14,-4,-3,-2,-2,-2,1\r\n\"Springfield Spartans\",-3,-2,0,1,1,3,-2,0,2,3,4,5,-4,-1,-1,5,6,7,1,1,4,5,6,7,5,7,7,8,9,12,10,12,14,14,16,18,-6,-5,-4,-4,-3,-2\r\n\"Boston Bombers\",-3,-2,2,6,9,12,-2,0,1,4,9,12,2,3,7,10,12,14,-2,-2,0,1,6,9,3,4,7,12,16,18,3,7,10,14,18,20,-9,-8,-4,-1,4,6\r\n\"Manchester Marauders\",2,2,3,4,5,8,4,6,7,9,10,12,8,9,9,10,10,14,3,4,6,9,12,14,7,8,9,10,12,14,7,9,10,12,16,18,-2,-1,0,0,1,2\r\n\"Newark Nighthawks\",-3,-2,0,0,2,3,0,1,2,2,2,5,0,2,3,5,6,8,2,5,6,6,8,9,5,6,8,9,10,10,5,6,9,10,14,16,-7,-5,-5,-3,-3,-1\r\n\"Rochester Rockets\",-3,-2,0,2,6,9,-4,-2,1,3,6,8,-2,1,2,6,8,9,5,6,7,12,14,16,5,9,10,14,16,18,12,12,14,14,14,18,-4,-4,-3,-2,0,1\r\n\"Boulder Barrage\",-3,-2,0,1,6,10,-7,-6,-2,2,6,7,-4,-3,3,6,10,12,-3,1,2,7,8,9,3,4,7,8,12,14,3,7,10,14,18,20,-8,-7,-6,-5,-1,3\r\n\"Portland Pounders\",0,1,2,4,7,10,1,2,4,7,10,12,4,5,8,9,10,12,3,6,9,12,14,16,5,9,10,14,16,18,9,9,12,14,18,22,-4,-3,-2,0,3,6\r\n\"Salt Lake City Shakers\",-2,0,2,4,8,12,0,2,4,8,10,12,3,4,7,12,16,18,7,7,10,12,16,20,3,7,10,14,18,20,5,6,7,10,14,18,-5,-4,-1,1,4,5\r\n\"St. Paul Paladins\",0,1,1,2,3,5,2,2,3,5,6,6,-2,0,1,2,5,6,1,2,4,4,5,8,4,4,5,6,7,10,7,9,10,10,10,14,-6,-6,-5,-3,-2,-2\r\n\"Columbia Crocodiles\",-2,-2,-1,0,1,4,2,4,6,6,8,10,1,2,4,7,10,12,2,4,7,9,12,14,5,7,8,10,14,16,3,6,9,12,14,16,-8,-6,-4,0,2,4\r\n\"Raleigh Reapers\",-2,-1,0,2,6,7,-3,-2,0,4,6,7,1,2,4,7,10,12,-6,-5,-2,2,5,6,3,4,7,8,12,14,5,7,8,10,14,16,-9,-8,-6,-4,-1,4\r\n\"Savannah Savages\",-3,-2,0,0,2,3,-5,-4,-2,2,4,5,-4,-2,0,5,6,7,2,3,6,9,12,16,4,5,9,10,14,18,5,9,10,12,16,20,-9,-8,-6,-4,0,3\r\n\"Virginia Beach Valiants\",-5,-4,-2,0,5,6,-2,0,1,6,9,10,-1,1,2,4,8,10,12,12,14,14,14,18,7,9,10,10,10,14,8,10,12,12,14,16,-7,-5,-4,-3,2,5\r\n\"Las Vegas Vampires\",-6,-4,0,5,8,9,-1,0,2,4,7,12,3,4,5,10,12,14,5,6,7,10,14,18,3,4,7,12,16,18,1,3,4,10,14,16,-5,-4,-2,-2,0,1\r\n\"Los Angeles Leopards\",-2,-1,0,0,1,2,0,0,1,2,4,5,3,5,5,7,7,9,0,3,5,10,14,16,2,4,5,9,12,16,-1,0,4,7,12,14,-7,-6,-4,-4,-3,0\r\n\"Oklahoma City Ogres\",3,4,4,7,8,10,5,6,8,8,9,12,3,4,5,7,8,9,4,6,7,9,10,12,7,9,10,10,12,12,12,12,14,14,16,16,-8,-5,-2,2,5,8\r\n\"San Antonio Scorpions\",0,1,2,4,8,9,-4,-3,0,2,7,10,1,2,4,7,10,12,3,6,9,10,14,18,3,6,9,10,14,18,5,9,12,16,20,22,-6,-5,-4,-1,1,3\r\n\"Essen Eagles\",0,1,1,1,4,5,0,3,4,5,6,6,2,4,6,6,8,10,2,6,8,8,10,14,5,7,9,11,13,15,6,8,10,14,16,18,-4,-3,-2,-1,-1,-1";
var awayTeamSelect;
var homeTeamSelect;
var awayTeam;
var homeTeam;

function Team(name) {
	this.teamName = name;
	this.red = [];
};

function initialize() {

	jQuery.get('../dicesheetv2.csv', function(data) {
		csv = data;
	});
	
	database = $.csv.toArrays(csv);

	for (var i = 0; i < database.length; i++) {
		var team = new Team(database[i][0]);
		team.red = [database[i][1],database[i][2],database[i][3],database[i][4],database[i][5],database[i][6]];
		team.ivory = [database[i][7],database[i][8],database[i][9],database[i][10],database[i][11],database[i][12]];
		team.brown = [database[i][13],database[i][14],database[i][15],database[i][16],database[i][17],database[i][18]];
		team.yellow = [database[i][19],database[i][20],database[i][21],database[i][22],database[i][23],database[i][24]];
		team.blue = [database[i][25],database[i][26],database[i][27],database[i][28],database[i][29],database[i][30]];
		team.green = [database[i][31],database[i][32],database[i][33],database[i][34],database[i][35],database[i][36]];
		team.black = [database[i][37],database[i][38],database[i][39],database[i][40],database[i][41],database[i][42]];
		teams.push(team);
	}

	awayTeamSelect = document.getElementById('awayTeamSelect');
	homeTeamSelect = document.getElementById('homeTeamSelect');
	

	for(i = 0; i < teams.length; i++) {
		var team = teams[i];
		var awayOptions = new Option;
		var homeOptions = new Option;

		awayOptions.text = team.teamName;
		awayOptions.value = i;

		homeOptions.text = team.teamName;
		homeOptions.value = i;

		awayTeamSelect.options[i] = awayOptions;
		homeTeamSelect.options[i] = homeOptions;

	}

	awayTeam = teams[0];
	homeTeam = teams[0];

	startGame();

};

function startGame() {

	awayTeam = teams[awayTeamSelect.value];
	homeTeam = teams[homeTeamSelect.value];

	document.getElementById('away-team-name').innerHTML = awayTeam.teamName;
	document.getElementById('home-team-name').innerHTML = homeTeam.teamName;

	rollDice();
}

function rollDice() {
	document.getElementById('away-black').innerHTML = awayTeam.black[diceRoll()];
	document.getElementById('away-red').innerHTML = awayTeam.red[diceRoll()];
	document.getElementById('away-ivory').innerHTML = awayTeam.ivory[diceRoll()];
	document.getElementById('away-brown').innerHTML = awayTeam.brown[diceRoll()];
	document.getElementById('away-yellow').innerHTML = awayTeam.yellow[diceRoll()];
	document.getElementById('away-blue').innerHTML = awayTeam.blue[diceRoll()];
	document.getElementById('away-green').innerHTML = awayTeam.green[diceRoll()];

	document.getElementById('home-black').innerHTML = homeTeam.black[diceRoll()];
	document.getElementById('home-red').innerHTML = homeTeam.red[diceRoll()];
	document.getElementById('home-ivory').innerHTML = homeTeam.ivory[diceRoll()];
	document.getElementById('home-brown').innerHTML = homeTeam.brown[diceRoll()];
	document.getElementById('home-yellow').innerHTML = homeTeam.yellow[diceRoll()];
	document.getElementById('home-blue').innerHTML = homeTeam.blue[diceRoll()];
	document.getElementById('home-green').innerHTML = homeTeam.green[diceRoll()];
}

function diceRoll() {
	return Math.floor(Math.random() * (6 - 1 + 1));
}
















