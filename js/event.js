/**
 * Definiert eine Map mit allen Ingame-Eventtypen, die auftreten können.
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

/**
 * Erstellt ein neues Event-Objekt.
 * Wird primär in 'level.js' verwendet.
 *
 * @param {EVENT_TYPE} type Der Typ des Events.
 * @param @optional {Tile} tile Das Tile, welches das Event ausgelöst hat.
 * @param @optional {string} msg Der Beschreibungstext des Events.
 * @constructor
 */
function Event (type, tile, msg) {
	this.type = type;
	this.tile = tile;
	this.message = msg;
}

Event.prototype.toString = function () {
	return "Event (" + this.type + ") on " + this.tile + ' (' + this.message + ')';
}