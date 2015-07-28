//=== Splashscreen ===

$(function() {
	
	//Den bisherigen Spielernamen laden, falls bereits einer existiert.
	if (!(localStorage.getItem("name") === null))
		$("#playerName_input").val(localStorage.getItem("name"));
	
	//Den gewählten Spielernamen für spätere Verwendung zwischenspeichern.
	$("#splash").submit(function(event) {
		localStorage.setItem("name", $("#playerName_input").val());
	});
	
});