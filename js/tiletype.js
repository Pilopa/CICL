//=== TileType ===

var BASIC_TILE_POINT_VALUE = 10; //Gibt den Standardpunktwert für ein Tile an. Dieser wird verwendet, wenn sonst kein Punktewert angegeben wird.

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

var TILE_TYPE_WALL = new TileType();
var TILE_TYPE_SOURCE = new TileType([DIRECTION_RIGHT], 'source');
var TILE_TYPE_DESTINATION = new TileType([DIRECTION_LEFT], 'dest');
var TILE_TYPE_STRAIGHT = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT], 'straight');
var TILE_TYPE_CORNER = new TileType([DIRECTION_LEFT, DIRECTION_DOWN], 'corner');
var TILE_TYPE_CROSSROADS = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN], 'crossroads');
var TILE_TYPE_TJUNCTION = new TileType([DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN], 'tjunction');