/**
 * Datenmodell einer Kachel in einem Level.
 *
 * @see 'level.js'
 * @requires 'tiletype.js'
 */
 
 //================================================================================================

 /**
  * Eine Map, welche die einzelnen Elemente definiert und mit einer String-Repräsentation assoziiert.
  *
  * @constant
  */
var TILE_ELEMENT = {
	'none': 'none',
	'acid': 'acid',
	'lava': 'lava',
	'honey': 'honey'
}

/**
 * Objekt, welches Konstanten für die einzelnen Himmelsrichtungen definiert.
 *
 * @constant
 */
var DIRECTION = {
	'up': 0,
	'right': 1,
	'down': 2,
	'left': 3
}

/**
 * Erstellt ein Tile-Objekt.
 *
 * @param {TileType} type Der Typ des Tiles (z.b. TILE_TYPE.straight für eine Gerade).
 * @param {string} element Das initiale Element des Tiles. Fast immer TILE_ELEMENT.none, außer bei Quellen/Zielen. (siehe TILE_ELEMENT)
 * @param {boolean} movable Ist das Tile bewegbar ?
 * @param {boolean} rotatable Ist das Tile drehbar ?
 * @constructor
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