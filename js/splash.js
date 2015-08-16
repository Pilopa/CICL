//=== Splashscreen ===

$(function() {
	if (!supports_session_storage()) console.log("Dieser Browser unterstützt leider kein Session-Storage!"); //Hier dem Benutzer eine Fehlermeldung anzeigen. !!! Das Spiel kann in der Form nicht gespielt werden !!!
	if (!supports_local_storage()) console.log("Dieser Browser unterstützt leider kein Local-Storage!"); //Hier dem Benutzer eine Fehlermeldung anzeigen. !!! Das Spiel kann in der Form nicht gespielt werden !!!
	else {
		//Cheat-Spieler zu testzwecken laden, falls nötig.
		initializeCheatPlayerObject();
		
		//Den bisherigen Spielernamen laden, falls bereits einer existiert.
		if (!(localStorage.getItem("name") === null))
			$("#playerName_input").val(localStorage.getItem("name"));
		
		//Den gewählten Spielernamen für spätere Verwendung zwischenspeichern. (Initialisierung des Spielerobjekts)
		$("#input").submit(function(event) {
			localStorage["name"] = $("#playerName_input").val().toLowerCase();
			if (localStorage[localStorage["name"]] === undefined) {
				var playerObject = initializeCurrentPlayerObject();
				for (var i = 0; i < getStages().length; i++) {
					playerObject.scores[i] = [];
					for (var n = 0; n < getStages()[i].length; n++) {
						playerObject.scores[i][n] = 0;
					}
				}
				saveCurrentPlayerObject(playerObject);
			}
		});
	
	} 
	
});