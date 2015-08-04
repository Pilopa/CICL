function supports_html5_storage() {
  try {
	  return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
	  return false;
  }
}

function getPlayerName() {
	return localStorage["name"];
}

function getPlayerObject() {
	try {
		return JSON.parse(localStorage[localStorage["name"]]);
	} catch (e) {
		return null;
	}
}

/**
 * Nach einem Satz von Änderungen an dem aktuellen Spielerobjekt, muss dieses wieder gespeichert werden.
 * 
 * @param object Das zu speichernde Spielerobjekt. Meist eine modifizierte Version von getPlayerObject().
 */
function savePlayerObject(object) {
	localStorage[localStorage["name"]] = JSON.stringify(object);
}

function resetPlayerObject() {
	localStorage[localStorage["name"]] = undefined;
}

function resetCompleteGame() {
	localStorage.clear();
	reloadGame();
}

function reloadGame() {
	location.reload();
}