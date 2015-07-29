//=== Stageselection ===

$(function() {
	
	//Lade die Auswahlliste der einzelnen Stages.
	for (i = 0; i < getStages().length; i++) {
		var stage = getStages()[i];
		if (i == 0) var stateClass = "active";
		else var stateClass = "inactive";
		$(document.createElement('div'))
			.addClass("item")
			.addClass("unselectable")
			.addClass("centered-text")
			.addClass(stateClass)
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
	combulix.speeches = [
         new Speech("Test 1"),
         new Speech("Test 2"),
         new Speech("Test 3")
	];
	
	combulix.slideIn();
	combulix.set(0);
	
});