//=== Stageselection ===

$(function() {
	
	var playerObject = getCurrentPlayerObject();
	
	//Lade die Auswahlliste der einzelnen Stages.
	for (i = 0; i < getStages().length; i++) {
		var stage = getStages()[i];
		var element = $(document.createElement('div'))
			.addClass("item")
			.addClass("unselectable")
			.addClass("centered-text")
			.attr("id", i)
			.html("Bereich " + (i + 1))
			.appendTo("#list");
	}
	
	//Behandle Auswahl einer Stage.
	
	$(".active").click(function(event) {
		showLevelSelection($(this).attr("id"));
	});
	
	//Initialisiere Combulix
	
	combulix.initialize();
	
	if (playerObject.showStageSelectionTutorial) {
		//Setze die Werte, welche angeben, dass der Spieler die Stageauswahl einmal betreten hat.
		playerObject.stageAvailable[0] = true;
		saveCurrentPlayerObject(playerObject);
		
		//Definiere die Texte von Combulix
		combulix.speeches = [
	         new Speech("Hallo, meine Name ist Combulix. Willkommen in meinem Labor! Klicke auf den grünen Pfeil, oder wische nach Links, um den nächsten Tipp zu lesen.",
	        		 undefined, function () {
	        	 $(".speech-bubble").addClass("highlighted");
	         }),
	         new Speech("Gut gemacht! Mir ist leider vorhin meine Apparatur kaputt gegangen. Du musst mir helfen, Sie zu reparieren!"),
	         new Speech("Fangen wir doch zunächst in Bereich 1 an.", undefined, function () {
	        	 $("#0").addClass("active").addClass("highlighted").click(function(event) {
	    			showLevelSelection($(this).attr("id"));
	    		});
	        	 $(".speech-bubble").removeClass("highlighted");
	         }, function () {
	        	 $("#0").removeClass("highlighted");
	         })
		];
		
	} else {
		//Lade Spielstand
		for (i = 0; i < getStages().length; i++) {
			if (playerObject.stageAvailable[i] == true) $("#" + i).addClass("active").addClass("highlighted").click(function(event) {
    			showLevelSelection($(this).attr("id"));
    		});
		}
		
		//Definiere die Texte von Combulix
		combulix.speeches = [
	         new Speech("Wähle den Bereich aus, in welchem du weitermachen möchtest . . .", undefined, function() {
	        	 $(".item.active").addClass("highlighted");
	         }, function () {
	        	 $(".item.active").removeClass("highlighted");
	         })
        ];
	}
	
	combulix.slideIn();
	
	//Initialisiere Menüelemente
	
	optionsMenu.initialize("7px", "calc(90% - 74px)").showButton();
	backButton.initialize("7px", "calc(100% - 74px)", showSplash).setVisible(true);
	
});