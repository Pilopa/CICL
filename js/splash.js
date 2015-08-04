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
				var playerObject = initializeCurrentPlayerObject();
				for (var i = 0; i < getStages().length; i++) {
					playerObject.scores[i] = [];
					for (var n = 0; n < getStages()[i].length; n++) {
						playerObject.scores[i][n] = 0;
					}
					playerObject.stageAvailable[i] = false;
				}
				saveCurrentPlayerObject(playerObject);
			}
		});
	
	} //else TODO: Fehlermeldung
	
});