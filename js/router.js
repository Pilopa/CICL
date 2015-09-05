/**
 * Schnittstelle zwischen den einzelnen HTML-Elementen (Menüs) unseres Projekts.
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

		$("#playerName_input").css({"box-shadow": "0px 0px 10px 2px #F00"});
		
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