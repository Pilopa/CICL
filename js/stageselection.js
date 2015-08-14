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
	
	//Initialisiere Combulix
	
	combulix.initialize();
	
	if (playerObject.showStageSelectionTutorial) {
		//Setze die Werte, welche angeben, dass der Spieler die Stageauswahl einmal betreten hat.
		playerObject.stageAvailable[0] = true;
		saveCurrentPlayerObject(playerObject);
		
		$("#list").hide();
		
		//Definiere die Texte von Combulix
		combulix.speeches = [
	         new Speech("<br>Oh nein,<br> nicht SCHON WIEDER !!! <br><br><br><br><i>(Klicke auf den grünen Pfeil, oder wische nach Links, um den nächsten Tipp zu lesen.)</i>", undefined,
	        		 
	        	function () {
	        	 
	        	 	$(".speech-bubble").addClass("highlighted");
	        	 	
	         	},
	         	
	         	function () {
		        	 
	        	 	$(".speech-bubble").removeClass("highlighted");
	        	 	
	         	}
	         
	         ),
	         
	         new Speech("Gut gemacht! <br><br>Wie du sicherlich mitbekommen hast, ist leider gerade meine Apparatur kaputt gegangen. <br><br>Du musst mir unbedingt helfen, Sie zu reparieren!", undefined,
	        		 
	 	        function () {
	        	 
	        	 	$(".speech-bubble").addClass("highlighted");
	        	 	
	         	},
	         	
	         	function () {
		        	 
	        	 	$(".speech-bubble").removeClass("highlighted");
	        	 	
	         	}
	         	
	         ),
	         
	         new Speech("Mein wertvoller Schatz ist in mehrere Bereiche eingeteilt.<br><br>Wir sollten Sie uns nacheinander vornehmen.<br><br>...", undefined,
	        		 
 	 	        function () {
 	        	 
 	        	 	$("#list").fadeIn(1000).addClass("highlighted");
 	        	 	
 	         	},
 	         	
 	         	function () {
 		        	 
 	        	 	$("#list").removeClass("highlighted");
 	        	 	
 	         	}
 	         	
 	         ),
	         
	         new Speech("Lass uns im ersten Bereich beginnen.<br><br>Klicke dazu auf die hervorgehobene Schaltfläche ...", undefined,
	        		 
	        	function () {
	        	 
		        	$("#0").addClass("active").addClass("highlighted").click(function(event) {
		    			showLevelSelection($(this).attr("id"));
		    		});
		        	$(".speech-bubble").removeClass("highlighted");
		        	
	         	},
	         	
	         	function () {
	         		
	         		$("#0").removeClass("highlighted");
	        	 
	         	}
	         	
	         ),
	         
	         new Speech("Klicke weiter oder wische nach Links, um mich auszublenden." +
		     		"<br><br>Du kannst mich jederzeit mit einem Klick auf den grünen Pfeil zurückholen.<br><br><i>(Es ändert nichts am Spielgeschehen!)</i>", undefined, 
		     		
	     		function () {
	        	 	$(".arrow.right").addClass("highlighted");
         		},
         		
         		function () {
         			$(".arrow.right").removeClass("highlighted");
         		}
	         )
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
	
	//Definiere Ziel für Zurück-Button
	backButton.setCallback(showSplash);
	
	//Behandle Auswahl einer Stage.
	
	$(".item.active").click(function(event) {
		showLevelSelection($(this).attr("id"));
	});
});