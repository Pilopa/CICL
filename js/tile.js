//=== Tile ===

var TILE_ELEMENT = {
	'none': 'none',
	'acid': 'acid',
	'lava': 'lava',
	'honey': 'honey'
}

var DIRECTION = {
	'up': 0,
	'right': 1,
	'down': 2,
	'left': 3
}

/**
 * 
 * 
 * @author Konstantin Schaper, Steffen Müller
 */

function Tile(type, element, movable, rotatable) {
	if (typeof movable === 'undefined') movable = false;
	if (typeof rotatable === 'undefined') rotatable = false;
	if (typeof element === 'undefined') element = [TILE_ELEMENT['none'], TILE_ELEMENT['none'], TILE_ELEMENT['none'], TILE_ELEMENT['none']];
	else if(typeof element === 'string') element = [element, element, element, element];
	this.x = 0;
	this.y = 0;
	this.type = type;
	this.elements = element;
	this.rotation = 0; // Anzahl von Schritten, die das Tile aus der Standard-Richtung verdreht ist
	this.movable = movable;
	this.rotatable = rotatable;
}

Tile.prototype.toString = function () {
	return "Tile { " + this.type + " [" + this.x + " | " + this.y + "], roation: " + this.rotation + " }";
}

Tile.prototype.rotate = function (steps) {
	this.rotation = (this.rotation+steps)%4;
}

Tile.prototype.getExits = function() {
	var ex = []
	for(var i = 0; i < this.type.initialExits.length; i++) {
		ex[i] = (this.type.initialExits[i] + this.rotation) %4;
	}
	return ex;
}

Tile.prototype.samePosAs = function(tile) {
	return this.x == tile.x && this.y == tile.y;
}

Tile.prototype.getElement = function(exit) {
	return this.elements[(4+exit-this.rotation)%4];
}

Tile.prototype.setElement = function(exit, ele) {
	this.elements[(4+exit-this.rotation)%4] = ele;
}