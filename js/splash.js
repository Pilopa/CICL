//=== Splashscreen ===

$(function() {
	
	if (supports_html5_storage()) {
		//Den bisherigen Spielernamen laden, falls bereits einer existiert.
		if (!(localStorage.getItem("name") === null))
			$("#playerName_input").val(localStorage.getItem("name"));
		
		//Den gewählten Spielernamen für spätere Verwendung zwischenspeichern.
		$("#splash").submit(function(event) {
			localStorage["name"] = $("#playerName_input").val();
			localStorage[localStorage["name"]] = JSON.stringify({
				"scores": []
			});
			for (var i = 0; i < getStages().length; i++) JSON.parse(localStorage[localStorage["name"]]).scores[i] = [];
		});
	
	} //TODO: Fehlermeldung
	
});