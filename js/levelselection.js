/**
 * Die Oberfläche, welche es dem Spieler erlaubt, ein Level eines Bereiches auszuwählen und zu spielen.
 * Bei dem erstmaligen Betreten wird ein Tutorial angezeigt.
 * Die Darstellung wird dynamisch erstellt und jedes Level hat seine eigene Wertungsanzeige.
 * 
 * @requires 'jquery-1.11.2.min.js'
 * @requires 'jquery.mobile-1.4.5.min.js'
 * @requires 'resurrect.js'
 * @requires 'main.js'
 * @requires 'audio.js'
 * @requires 'tile.js'
 * @requires 'stages.js'
 * @requires 'router.js'
 * @requires 'menues.js'
 * @requires 'combulix.js'
 *
 * @see levelselection.html
 * @see levelselection.css
 */

$(function() {
	
	//Allgemeine Variablen
	var stageId = location.search.replace("?", "");
	var stage = getStages()[stageId];
	var playerObject = getCurrentPlayerObject();
	
	//Lade die Auswahlliste der einzelnen Levels.
	for (var i = 0; i < getStages()[stageId].levels.length; i++) {
		var level = getStages()[stageId].levels[i];
		var element = $(document.createElement('div'))
			.addClass("item")
			.addClass("level-item")
			.attr("id", i)
			.appendTo("#list");
		
		var levelTitle = $(document.createElement('span'))
		.text(level.title)
		.addClass("item-text")
		.appendTo("#" + i);
		
		var ratingContainer = $(document.createElement('div'))
		.addClass("rating-container")
		.attr("id", "rating-container-" + i)
		.appendTo("#" + i);
		
		var score = playerObject.scores[stageId][i];
		var floorScore =  Math.floor(score);
		
		for (var n = 0; n < 5; n++) {
			var ratingDisplay = $(document.createElement('div'))
			.addClass("rating-display")
			.attr("id", "rating-" + n)
			.appendTo("#rating-container-" + i);
			
			if (score > n) {
				if (n === floorScore && score !== parseInt(score, 10)) {
					if (0.5 <= score - floorScore) ratingDisplay.addClass("star-half");
				} else ratingDisplay.addClass("star-full");
			} else {
				ratingDisplay.addClass("star-empty");
			}
		}
		
		//Initialisiere Sound
		audio.soundOnClick(".item");
	}
	
	//Initialisiere Bereichstitel
	$("#stage-id").text(stage.title === undefined ? "Bereich " + (i + 1) : stage.title);
	
	//Combulix
	combulix.initialize();
	
	if (playerObject.showStageSelectionTutorial) {
		playerObject.showStageSelectionTutorial = false;
		saveCurrentPlayerObject(playerObject);
	}
	
	 //Zeige das Tutorial, wenn es der Spieler das erste Mal in diesem Menü ist.
	if (playerObject.showLevelSelectionTutorial) {
		
		$("#list").hide();
		$("#stage-id").hide();
		$("hr").hide();
		
		combulix.speeches = [
		                     
	         new Speech("Super! Du hast die Levelauswahl gefunden ...", undefined,
	        		 
	        	function () {
	        	 
		        	 $(".speech-bubble").addClass("highlighted");
		        	 
		         },
		         
		         function () {
		        	 
		        	 $(".speech-bubble").removeClass("highlighted");
		        	 
		         }
	         
	         ),
	         
	         new Speech("Jeder Bereich ist normalerweise in vier Level unterteilt.<br><br>Jedes davon stellt dich vor eine größere Herausforderung als das Letzte ...", undefined,
	        		 
 	        	function () {
	        	 
 		        	 $(".item").addClass("highlighted");
 		        	 $("#list").fadeIn(1000);
 		        	 $("#stage-id").fadeIn(1000);
 		        	 $("hr").fadeIn(1000);
 		        	 
 		         },
 		         
 		         function () {
 		        	 
 		        	 $(".item").removeClass("highlighted");
 		        	 
 		         }
 	         
 	         ),
	         
	         new Speech("Wenn du ein Level erfolgreich abschließt, wirst du mit minimal einem und maximal fünf Sternen dafür belohnt ...", undefined,
	        		 
	        	function () {
	        	 
	        	 	$(".rating-container").addClass("highlighted");
	        	 	
	         	},
	         	
	         	function () {
	         		
	        	 	$(".rating-container").removeClass("highlighted");
	        	 	
	         	}
	         	
	         ),
	         
	         new Speech("Um das nächste Level freizuschalten, musst du in dem Vorherigen mindestens 3 von 5 Sternen erreicht haben ...", undefined,
	        		 
		        function () {
	        	 
	        	 	$(".speech-bubble").addClass("highlighted");
	        	 	
		        },
		         
		         function () {
		        	 
		        	 $(".speech-bubble").removeClass("highlighted");
		        	 
		         }
	         
	         ),
	         
	         new Speech("Genug gequatscht! <br><br>Lass uns mit der Einführung anfangen.<br><br>Klicke dazu auf den hervorgehobenen Button.", undefined,
	        		 
	        	function () {
	        	 
		        	$("#0").addClass("active").addClass("highlighted").click(function(event) {
		    			showLevel(stageId, $(this).attr("id"))
		    		});
		        	 
	         	},
	         	
		         function () {
	         		
		        	 $("#0").removeClass("highlighted");
		        	 
		         }
	         	
	         )
	         
		];
		
	} else {
		
		//Lade Spielstand
		//Wenn die Stage verfügbar ist, ist auch automatisch das erste Level verfügbar. Ansonsten benötigt jedes Level mindestens einen Punkt in dem vorhergegangenen Level.
		for (i = 0; i < stage.levels.length; i++) {
			if (i == 0 || (playerObject.scores[stageId][i-1] > 0)) $("#" + i).addClass("interactable").addClass("active").addClass("highlighted").click(function(event) {
				showLevel(stageId, $(this).attr("id"))
    		});
		}
		
		//Definiere die Texte von Combulix
		combulix.speeches = [
		                     
	         new Speech("Wähle das Level aus, in welchem du weitermachen möchtest . . .", undefined,
	        		 
	        	 function() {
	        	 
		        	 $(".item.active").addClass("highlighted");
		        	 
		         },
		         
		         function () {
		        	 
		        	 $(".item.active").removeClass("highlighted");
		        	 
		         }
	         )
	         
        ];
		
	}
	
	combulix.slideIn();
	
	//Definiere Ziel für Zurück-Button
	backButton.setCallback(showStageSelection);
	
	//Behandle Auswahl eines Levels.
	$(".item.active").click(function(event) {
		showLevel(stageId, $(this).attr("id"))
	});
	
	//Initialisiere Sound für Back-Button
	audio.soundOnClick("#back-button");
	
	//Starte Spielmusik
	audio.playMusic();
	
});