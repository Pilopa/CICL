//=== Levelselection ===

$(function() {
	
	//Lade die Auswahlliste der einzelnen Levels.
	var stageId = location.search.replace("?", "");
	for (i = 0; i < getStages()[stageId].levels.length; i++) {
		var level = getStages()[stageId].levels[i];
		var element = $(document.createElement('span'))
			.addClass("item")
			.addClass("unselectable")
			.addClass("centered-text")
			.attr("id", i)
			.text("Level " + (i + 1))
			.appendTo("#list");
	}
	
	//Behandle Auswahl eines Levels.
	$(".active").click(function(event) {
		showLevel(stageId, $(this).attr("id"))
	});
	
	//Combulix
	combulix.initialize();
	//combulix.slideIn();
	
});