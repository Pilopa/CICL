//=== Router ===

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
			boxShadow : "0 0 75px 0 rgba(255, 0, 0, 1) inset"
		}, 400, function () {
			$(this).animate({
				boxShadow : "0 0 75px 0 rgba(255, 0, 0, 1) inset"
			}, function () {
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