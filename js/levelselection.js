//=== Levelselection ===

$(function() {
	
	//Lade die Auswahlliste der einzelnen Levels.
	var stageId = location.search.replace("?", "");
	var stage = getStages()[stageId];
	for (i = 0; i < getStages()[stageId].levels.length; i++) {
		var level = getStages()[stageId].levels[i];
		var element = $(document.createElement('span'))
			.addClass("item")
			.addClass("unselectable")
			.addClass("centered-text")
			.attr("id", i)
			.text(level.title)
			.appendTo("#list");
	}
	
	//Behandle Auswahl eines Levels.
	$(".active").click(function(event) {
		showLevel(stageId, $(this).attr("id"))
	});
	
	//Combulix
	combulix.initialize();
	var playerObject = getCurrentPlayerObject();
	if (playerObject.firstLevelSelection) { //Zeige das Tutorial, wenn es der Spieler das erste Mal in diesem Menü ist.
		playerObject.firstLevelSelection = false;
		saveCurrentPlayerObject(playerObject);
		combulix.speeches = [
	         new Speech("Super! Du hast die Levelauswahl gefunden.",
	        		 undefined, function () {
	        	 $(".speech-bubble").addClass("highlighted");
	         }),
	         new Speech("Lass uns zunächst mit der Einführung anfangen. Klicke dazu auf die hervorgehobene Schaltfläche.", undefined, function () {
	        	 $("#0").addClass("active").addClass("highlighted").click(function(event) {
	    			showLevel(stageId, $(this).attr("id"))
	    		});
	         }, function () {
	        	 $("#0").removeClass("highlighted");
	         })
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
	         new Speech("Wählen das Level aus, in welchem du weitermachen möchtest . . .", undefined, function() {
	        	 $(".item.active").addClass("highlighted");
	         }, function () {
	        	 $(".item.active").removeClass("highlighted");
	         })
        ];
		
	}
	combulix.slideIn();
	
});