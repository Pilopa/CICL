/*
 * Definiert alle Ingame-Eventtypen, die auftreten können.
 * Diese Eventtypen haben besonders für 'level.js' und 'levelview.js' relevanz.
 */
	
var EVENT_TYPE = {
	'placed': "PLACED",
	'swapped': "SWAPPED",
	'removed': "REMOVED",
	'rotated': "ROTATED",
	'destinationreached': "DESTINATION_REACHED",
	'testcompleted': "TEST_COMPLETED",
	'testfailed': "TEST_FAILED",
}

//Die Parameter tile und msg sind optional.
function Event (type, tile, msg) {
	this.type = type;
	this.tile = tile;
	this.message = msg;
}

Event.prototype.toString = function () {
	return "Event (" + this.type + ") on " + this.tile + ' (' + this.message + ')';
}