//=== Router ===

function showStageSelection() {
	location.href = "../html/stageselection.html";
}

function showLevelSelection(stageId) {
	location.href = "../html/levelselection.html?" + stageId;
	
}

function showLevel(stageId, levelId) {
	location.href = "../html/level.html?" + stageId + "-" + levelId;
}
