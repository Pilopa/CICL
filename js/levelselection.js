//=== Levelselection ===

$(function() {
	
	//Lade die Auswahlliste der einzelnen Levels.
	var stageId = location.search.replace("?", "");
	for (i = 0; i < stages[stageId].levels.length; i++) {
		var level = stages[stageId].levels[i];
		if (i == 0) var stateClass = "active";
		else var stateClass = "active";
		$(document.createElement('span'))
			.addClass("item")
			.addClass("unselectable")
			.addClass("centered-text")
			.addClass(stateClass)
			.attr("id", i)
			.text("Level " + (i + 1))
			.appendTo("#list");
	}
	
	//Behandle Auswahl eines Levels.
	$(".active").click(function(event) {
		showLevel(stageId, $(this).attr("id"))
	});
	
});