//=== Levelselection ===

$(function() {
	
	//Allgemeine Variablen
	var stageId = location.search.replace("?", "");
	var stage = getStages()[stageId];
	var playerObject = getCurrentPlayerObject();
	
	//Lade die Auswahlliste der einzelnen Levels.
	for (var i = 0; i < getStages()[stageId].levels.length; i++) {
		var level = getStages()[stageId].levels[i];
		var element = $(document.createElement('span'))
			.addClass("item")
			.addClass("level-item")
			.addClass("unselectable")
			.attr("id", i)
			.text(level.title)
			.appendTo("#list");
		
		var ratingContainer = $(document.createElement('span'))
		.addClass("rating-container")
		.addClass("unselectable")
		.attr("id", "rating-container-" + i)
		.appendTo("#" + i);
		
		for (var n = 0; n < 5; n++) {
			var ratingDisplay = $(document.createElement('span'))
			.addClass("rating-display")
			.addClass("unselectable")
			.attr("id", "rating-" + i)
			.appendTo("#rating-container-" + i);
			
			if (playerObject.scores[stageId][i] > n) {
				ratingDisplay.addClass("star-full");
			} else {
				ratingDisplay.addClass("star-empty");
			}
		}
	}
	
	$("#list").prepend("<div class='stage-id'>Bereich " + stageId + "</div>");
	
	//Combulix
	combulix.initialize();
	
	if (playerObject.showStageSelectionTutorial) {
		playerObject.showStageSelectionTutorial = false;
		saveCurrentPlayerObject(playerObject);
	}
	
	if (playerObject.showLevelSelectionTutorial) { //Zeige das Tutorial, wenn es der Spieler das erste Mal in diesem Menü ist.
		
		$("#list").hide();
		
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
			if (i == 0 || (playerObject.scores[stageId][i-1] > 0)) $("#" + i).addClass("active").addClass("highlighted").click(function(event) {
				showLevel(stageId, $(this).attr("id"))
    		});
		}
		
		//Definiere die Texte von Combulix
		combulix.speeches = [
		                     
	         new Speech("Wählen das Level aus, in welchem du weitermachen möchtest . . .", undefined,
	        		 
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
	
});