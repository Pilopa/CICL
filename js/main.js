/**
 * Definiert allgemeine Methoden und wird von jeder HTML-Datei eingebunden.
 * 
 * @see main.css
 */
 
//================================================================================================

//Benutze serializer.stringify(object) (Schreiben) und serializer.resurrect() (Lesen) zur Serialisierung von Objekten.
var serializer = new Resurrect();

/**
 * @return {boolean} Der Browser unterstützt LocalStorage.
 */
function supports_local_storage() {
  try {
	  return typeof(localStorage) !== 'undefined';
  } catch (e) {
	  return false;
  }
}

/**
 * @return {boolean} Der Browser unterstützt SessionStorage.
 */
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
		showGameTutorial: true,
		playSound: true,
		playMusic: true
	});
	return getCurrentPlayerObject();
}

/**
 * Der Testspieler heißt 'stefko' und besitzt eine Wertung von 3 Sternen in jedem Level.
 * Viel spaß beim Testen! :)
 */
function initializeTestPlayerObject() {
	if (localStorage["stefko"] === undefined)
		localStorage["stefko"] = JSON.stringify({
			scores: [
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3]
			], //Map mit den Punkteständen der einzelnen Levels für jede Stage.
			
			showStageSelectionTutorial: false,
			showLevelSelectionTutorial: false,
			showGameTutorial: false,
			playSound: false,
			playMusic: false
		});
}

/**
 * Nach einem Satz von Änderungen an dem aktuellen Spielerobjekt, muss dieses wieder gespeichert werden.
 */
function saveCurrentPlayerObject(object) {
	localStorage[localStorage["name"]] = JSON.stringify(object);
}

/**
 * Wird derzeit (v0.8.5) nicht genutzt, ist aber der Vollständigkeit halber definiert.
 */
function resetCurrentPlayerObject() {
	localStorage[localStorage["name"]] = undefined;
}

/**
 * Wird derzeit (v0.8.5) nicht genutzt, ist aber der Vollständigkeit halber definiert.
 */
function resetCompleteGame() {
	localStorage.clear();
	reloadGame();
}

/**
 * Wird derzeit (v0.8.5) nicht genutzt, ist aber der Vollständigkeit halber definiert.
 */
function reloadGame() {
	location.reload();
}

/**
 * @deprecated
 */
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