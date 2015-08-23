//Benutze serializer.stringify(object) (Schreiben) und serializer.resurrect() (Lesen) zur Serialisierung von Objekten.
var serializer = new Resurrect();

function supports_local_storage() {
  try {
	  return typeof(localStorage) !== 'undefined';
  } catch (e) {
	  return false;
  }
}

function supports_session_storage() {
  try {
	  return typeof(sessionStorage) !== 'undefined';
  } catch (e) {
	  return false;
  }
}

function getCurrentPlayerName() {
	return localStorage["name"];
}

function getCurrentPlayerObject() {
	try {
		return JSON.parse(localStorage[localStorage["name"]]);
	} catch (e) {
		return null;
	}
}

function getPlayerTotalScore(playerObject) {
	if (playerObject === undefined) playerObject = getCurrentPlayerObject();
	var result = 0;
	for (var stageIndex = 0; stageIndex < playerObject.scores.length; stageIndex++) {
		var stageScores = playerObject.scores[stageIndex];;
		for (var levelIndex = 0; levelIndex < stageScores.length; levelIndex++) {
			result += stageScores[levelIndex];
		}
	}
	
	return result;
}

function getPlayerStageScore(stageId, playerObject) {
	if (playerObject === undefined) playerObject = getCurrentPlayerObject();
	var result = 0;
	var stageScores = playerObject.scores[stageId];
	for (var levelIndex = 0; levelIndex < stageScores.length; levelIndex++) {
		result += stageScores[levelIndex];
	}
	
	return result;
}

function getStageScoreLimit(stageId) {
	var result = 0;
	var stage = getStages()[stageId];
	for (var levelIndex = 0; levelIndex < stage.levels.length; levelIndex++) {
		result += 5; //Fünf ist die maximale Anzahl an Sternen, die man in einem Level erreichen kann.
	}
	
	return result;
}

function initializeCurrentPlayerObject() {
	localStorage[localStorage["name"]] = JSON.stringify({
		scores: [], //Map mit den Punkteständen der einzelnen Levels für jede Stage.
		showStageSelectionTutorial: true,
		showLevelSelectionTutorial: true,
		showGameTutorial: true
	});
	return getCurrentPlayerObject();
}

function initializeCheatPlayerObject() {
	if (localStorage["stefko"] === undefined)
		localStorage["stefko"] = JSON.stringify({
			scores: [
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3]
			], //Map mit den Punkteständen der einzelnen Levels für jede Stage.
			
			showStageSelectionTutorial: false,
			showLevelSelectionTutorial: false,
			showGameTutorial: false
		});
}

/**
 * Nach einem Satz von Änderungen an dem aktuellen Spielerobjekt, muss dieses wieder gespeichert werden.
 * 
 * @param object Das zu speichernde Spielerobjekt. Meist eine modifizierte Version von getPlayerObject().
 */
function saveCurrentPlayerObject(object) {
	localStorage[localStorage["name"]] = JSON.stringify(object);
}

function resetCurrentPlayerObject() {
	localStorage[localStorage["name"]] = undefined;
}

function resetCompleteGame() {
	localStorage.clear();
	reloadGame();
}

function reloadGame() {
	location.reload();
}

function hasEventHandler(classes, event) {
	var events = $._data(document.getElementsByClassName(classes)[0], "events");
	if (events !== undefined && events.hasOwnProperty(event)) {
		var eventHandlers = events[event];
		var eventCount = eventHandlers.length;
		return eventCount > 0;
	} else return false;
}

function fadeIn() {
	$("#game").hide().fadeIn(800);
}