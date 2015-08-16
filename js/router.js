//=== Router ===

function showStageSelection() {
	$(".game").fadeOut(function () {
		location.href = "../html/stageselection.html";
	});
}

function showLevelSelection(stageId) {
	$(".game").fadeOut(function () {
		location.href = "../html/levelselection.html?" + stageId;
	});
	
}

function showLevel(stageId, levelId) {
	$(".game").fadeOut(function () {
		location.href = "../html/levelview.html?" + stageId + "-" + levelId;
	});
}

function showSplash() {
	$(".game").fadeOut(function () {
		location.href = "../html/splash.html";
	});
	
}