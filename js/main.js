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