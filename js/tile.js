//=== Tile ===

var TILE_ELEMENT_NONE = "none";
var TILE_ELEMENT_ACID = "acid";
var TILE_ELEMENT_LAVA = "lava";
var TILE_ELEMENT_HONEY = "honey";

var DIRECTION_UP = 0;
var DIRECTION_RIGHT = 1;
var DIRECTION_DOWN = 2;
var DIRECTION_LEFT = 3;

/**
 * 
 * 
 * @author Konstantin Schaper, Steffen Müller
 */

function Tile(type, element, movable) {
	if (typeof movable === 'undefined') movable = false;
	if (typeof element === 'undefined') element = [TILE_ELEMENT_NONE, TILE_ELEMENT_NONE, TILE_ELEMENT_NONE, TILE_ELEMENT_NONE];
	else if(typeof element === 'string') element = [element, element, element, element];
	this.x = 0;
	this.y = 0;
	this.type = type;
	this.elements = element;
	this.rotation = 0;
	this.movable = movable;
}

Tile.prototype.toString = function () {
	return "Tile { " + this.type + " [" + this.x + " | " + this.y + "], roation: " + this.rotation + " }";
}

Tile.prototype.rotate = function (steps) {
	this.rotation += steps;
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