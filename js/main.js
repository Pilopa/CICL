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

function initializeCurrentPlayerObject() {
	localStorage[localStorage["name"]] = JSON.stringify({
		scores: [], //Map mit den Punkteständen der einzelnen Levels für jede Stage.
		stageAvailable: [], //Enthält für jede Stage einen Boolean welcher angibt, ob diese Stage für den Spieler vergfügbar ist.
		firstStageSelection: true,
		firstLevelSelection: true
	});
	return getCurrentPlayerObject();
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

/**
 * Benutze hydrate.stringify(object) (Schreiben) und hydrate.parse() (Lesen) zur Serialisierung von Objekten.
 */
var hydrate = new Hydrate();