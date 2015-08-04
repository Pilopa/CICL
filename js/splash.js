//=== Splashscreen ===

$(function() {
	
	if (supports_html5_storage()) {
		//Den bisherigen Spielernamen laden, falls bereits einer existiert.
		if (!(localStorage.getItem("name") === null))
			$("#playerName_input").val(localStorage.getItem("name"));
		
		//Den gewählten Spielernamen für spätere Verwendung zwischenspeichern. (Initialisierung des Spielerobjekts)
		$("#splash").submit(function(event) {
			localStorage["name"] = $("#playerName_input").val().toLowerCase();
			if (localStorage[localStorage["name"]] === undefined) {
				localStorage[localStorage["name"]] = JSON.stringify({
					scores: [], //Map mit den Punkteständen der einzelnen Levels für jede Stage.
					stageAvailable: [], //Enthält für jede Stage einen Boolean welcher angibt, ob diese Stage für den Spieler vergfügbar ist.
					firstStageSelection: true,
					firstLevelSelection: true
				});
				var playerObject = getPlayerObject();
				for (var i = 0; i < getStages().length; i++) {
					playerObject.scores[i] = [];
					for (var n = 0; n < getStages()[i].length; n++) {
						playerObject.scores[i][n] = 0;
					}
					playerObject.stageAvailable[i] = false;
				}
				savePlayerObject(playerObject);
			}
		});
	
	} //else TODO: Fehlermeldung
	
});