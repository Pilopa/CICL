//=== TileType ===

var BASIC_TILE_POINT_VALUE = 10;

function TileType(exits, pointValue) {
	if (!exits) exits = [];
	if (!pointValue) pointValue = BASIC_TILE_POINT_VALUE;
	this.initialExits = exits;
	this.pointValue = pointValue;
}

TileType.prototype.toString = function() {
	return "{ TileType (" + this.pointValue + ") }";
}

var TILE_TYPE_WALL = new TileType();
var TILE_TYPE_SOURCE = new TileType([DIRECTION_RIGHT]);
var TILE_TYPE_DESTINATION = new TileType([DIRECTION_LEFT]);
var TILE_TYPE_STRAIGHT = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT]);
var TILE_TYPE_CORNER = new TileType([DIRECTION_LEFT, DIRECTION_DOWN]);
var TILE_TYPE_CROSSROADS = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN]);
var TILE_TYPE_TJUNCTION = new TileType([DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN]);