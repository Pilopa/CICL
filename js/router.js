/*
 * Schnittstelle zwischen den einzelnen HTML-Elementen unseres Projekts.
 */

function showStageSelection() {
	if (getCurrentPlayerObject() !== null) {
		
		$(".game").fadeOut(function () {
			audio.updateMusicTime();
			location.href = "../html/stageselection.html";
		});
		
	} else {
		
		audio.errorSound.load();
		audio.errorSound.play();
		
		document.getElementById("continue").disabled = true;

		$("#playerName_input").animate({
			"border-color" : "red"
		}, 400, function () {
			$(this).animate({
				"border-color" : "black"
			}, 400, function () {
				document.getElementById("continue").disabled = false;
			});
		});
		
	}
}

function showLevelSelection(stageId) {
	$(".game").fadeOut(function () {
		audio.updateMusicTime();
		location.href = "../html/levelselection.html?" + stageId;
	});
	
}

function showLevel(stageId, levelId) {
	$(".game").fadeOut(function () {
		audio.updateMusicTime();
		location.href = "../html/levelview.html?" + stageId + "-" + levelId;
	});
}

function showSplash() {
	$(".game").fadeOut(function () {
		audio.updateMusicTime();
		location.href = "../html/splash.html";
	});
}