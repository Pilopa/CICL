//=== Tile ===

var TILE_ELEMENT_NONE = 0;
var TILE_ELEMENT_ACID = 1;
var TILE_ELEMENT_LAVA = 2;
var TILE_ELEMENT_HONEY = 3;

var DIRECTION_UP = 0;
var DIRECTION_RIGHT = 1;
var DIRECTION_DOWN = 2;
var DIRECTION_LEFT = 3;

function Tile(type, element) {
	if (!element) element = TILE_ELEMENT_NONE;
	this.x = 0;
	this.y = 0;
	this.type = type;
	this.element = element;
	this.rotation = DIRECTION_UP;
	this.removable = false;
}

Tile.prototype.toString = function () {
	return "{ " + this.type + " [" + this.x + " | " + this.y + "], roation: " + this.rotation + " }";
}

Tile.prototype.rotate = function (steps) {
	this.rotation += steps;
}