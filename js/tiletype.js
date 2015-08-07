//=== TileType ===

var BASIC_TILE_POINT_VALUE = 10; //Gibt den Standardpunktwert für ein Tile an. Dieser wird verwendet, wenn sonst kein Punktewert angegeben wird.

var TILE_NAME_WALL = 'wall';
var TILE_NAME_SOURCE = 'source';
var TILE_NAME_DESTINATION = 'dest';
var TILE_NAME_STRAIGHT = 'straight';
var TILE_NAME_CORNER = 'corner';
var TILE_NAME_CROSSROADS = 'crossroads';
var TILE_NAME_TJUNCTION = 'tjunction';

function TileType(exits, name, pointValue) {
	if (!exits) exits = [];
	if (!pointValue) pointValue = BASIC_TILE_POINT_VALUE;
	this.initialExits = exits;
	this.pointValue = pointValue;
	this.name = name;
}

TileType.prototype.toString = function() {
	return "{ TileType (" + this.pointValue + ") }";
}

var TILE_TYPE_WALL = new TileType([], 0, TILE_NAME_WALL);
var TILE_TYPE_SOURCE = new TileType([DIRECTION_RIGHT], TILE_NAME_SOURCE);
var TILE_TYPE_DESTINATION = new TileType([DIRECTION_LEFT], TILE_NAME_DESTINATION);
var TILE_TYPE_STRAIGHT = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT], TILE_NAME_STRAIGHT);
var TILE_TYPE_CORNER = new TileType([DIRECTION_LEFT, DIRECTION_DOWN], TILE_NAME_CORNER);
var TILE_TYPE_CROSSROADS = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN], TILE_NAME_CROSSROADS);
var TILE_TYPE_TJUNCTION = new TileType([DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN], TILE_NAME_TJUNCTION);