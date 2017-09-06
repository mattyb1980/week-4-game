$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;	//Set Global Variables
	var wins = 0;
	var losses = 0;

// Gets Link for Theme Song
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/theme.mp3");

      // Theme Button
      $(".theme-button").on("click", function() {
        audioElement.play();
      });

      $(".pause-button").on("click", function() {
        audioElement.pause();
      });



	function varSet() {		//Sets all of the variable values
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Bart",
			pic: 'assets/images/bart.png',
			hitPoints: 150,
			attackPower: 5
		}, {
			id: 1,
			name: "Homer",
			pic: 'assets/images/homer.png',
			hitPoints: 100,
			attackPower: 25 		
		}, {
			id: 2,
			name: "Burns",
			pic: 'assets/images/burns.png',
			hitPoints: 120,
			attackPower: 19 
		}, {
			id: 3,
			name: "Selma",
			pic: 'assets/images/selma.png',
			hitPoints: 140,
			attackPower: 9 
		}, {
			id: 4,
			name: "SideshowBob",
			pic: 'assets/images/sideshowbob.png',
			hitPoints: 135,
			attackPower: 24 
		}, {
			id: 5,
			name: "EvilKrusty",
			pic: 'assets/images/evilkrusty.png',
			hitPoints: 95,
			attackPower: 32 
		} ]; 

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 5;
		rounds = 20;

		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='cards' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].hitPoints +
			"<br> AP: " + enemyArray[i].attackPower + " </div>";
		}

		$("#selector").html(choices);
		$("#instruction").html("Click to choose your Springfieldian!");

		$(".hero").remove();
		$(".fighting").remove();
		$("#whatHappens").html("");

		attachCharacterOnClick();
	}

	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='cards' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].hitPoints +
			"<br> AP: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='cards' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].hitPoints +
			"<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
		$("#user").html(hero);
		$("#enemy").html(badguy);
	}

	function whatHappens() {
		var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>" +
			"Your attack power has increased by " + rounds + "!";
		$('#whatHappens').html(description);
	}

	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	//Picking your character
				myChar = $(this).attr('id');
				$("#user").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$("#whatHappens").html("");
				$("#instruction").html("Choose your opponent!");
			}
			//You have a character and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr("id")) {	
				opponentChar = $(this).attr("id");
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$("#whatHappens").html("");
				$("#instruction").html("Keep clicking attack to duel!");
			}
		});
	}

	$("#attack").on("click", function() {
		if(!haveCharacter) {
			$("#whatHappens").html("You need to pick your fighter first!");
		}
		else if(!haveAttacker) {
			$("#whatHappens").html("Pick who you are fighting!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			enemyArray[opponentChar].hitPoints  = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;	//Hit Them
			enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;	//Get Hit


			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$("#whatHappens").html("");
					$("#instruction").html("Who will you duel next?");
					haveAttacker = false;
				}
				else {
					whatHappens();
					alert("You saved Springfield!  Play again!");
					wins++;
					$("#winslosses").html("Overall Wins: " + wins + "&nbsp;&nbsp;Losses: " + losses);
					varSet();
				}
				
			}
			else if(enemyArray[myChar].hitPoints < 0) {
				whatHappens();
				alert("Springfield has been lost!  Try again!");
				losses++;
				$("#winslosses").html("Overall Wins: " + wins + "&nbsp;&nbsp;Losses: " + losses);
				varSet();
			}
			else {
				whatHappens();
				printCharacters();
			}

			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$("#restart").on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});