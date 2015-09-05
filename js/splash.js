/**
 * Logik zum Startpunkt der Anwendung.
 * 
 * @requires 'jquery-1.11.2.min.js'
 * @requires 'resurrect.js'
 * @requires 'main.js'
 * @requires 'audio.js'
 * @requires 'stages.js'
 * @requires 'router.js'
 *
 * @see splash.html
 * @see splash.css
 */

$(function() {
	var sessionStorageSupported = supports_session_storage();
	var localStorageSupported = supports_local_storage();
	
	if (sessionStorageSupported && localStorageSupported) {
		
		//Testspieler laden, falls nötig.
		initializeTestPlayerObject();
		
		//Den bisherigen Spielernamen laden, falls bereits einer existiert.
		if (!(localStorage.getItem("name") === null)) $("#playerName_input").val(localStorage.getItem("name"));
		
		//Den gewählten Spielernamen für spätere Verwendung zwischenspeichern. (Initialisierung des Spielerobjekts)
		$("#input").submit(function(event) {
			var playerName = $("#playerName_input").val().toLowerCase().trim();
			if (playerName !== "") {
				localStorage["name"] = playerName;
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
			}
		});
		
		$("#playerName_input").keyup(function (event) {
			$("#playerName_input").css({"box-shadow": "0px 0px 0px 0px #000"});
		});
		
		//Initialisiere Sound
		audio.soundOnClick("#continue");
		
		//Starte Spielmusik
		audio.playMusic();
	
	} else {
		
		$(".game#splash").html("").css({
			"font-size": "24px",
			"color": "#f00"
		}).addClass("centered-text");
		
		if (!sessionStorageSupported) $(".game#splash").append("Fehler: Dieser Browser unterstützt leider kein Session-Storage!<br>");
		if (!localStorageSupported) $(".game#splash").append("Fehler: Dieser Browser unterstützt leider kein Local-Storage!");
		
	}
	
});