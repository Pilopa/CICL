//=== TileType ===

var TILE_POINT_VALUE = {
	'basic': 10, //Gibt den Standardpunktwert für ein Tile an. Dieser wird verwendet, wenn sonst kein Punktewert angegeben wird.
	'straight': 10,
	'corner': 15,
	'crossroads': 40,
	'tjunction': 30,
}

var TILE_NAME = {
	'wall': 'wall',
	'source': 'source',
	'destination': 'destination',
	'straight': 'straight',
	'corner': 'corner',
	'crossroads': 'crossroads',
	'tjunction': 'tjunction',
}

var TILE_AMOUNT_ENDLESS = -1;

function TileType(exits, name, pointValue) {
	if (!exits) exits = [];
	if (!pointValue) pointValue = TILE_POINT_VALUE['basic'];
	this.initialExits = exits;
	this.pointValue = pointValue;
	this.name = name;
}

TileType.byName = function(name) {
	if (name === TILE_NAME['wall']) return TILE_TYPE_WALL;
	else if (name === TILE_NAME['source']) return TILE_TYPE_SOURCE;
	else if (name === TILE_NAME['destination']) return TILE_TYPE_DESTINATION;
	else if (name === TILE_NAME['straight']) return TILE_TYPE_STRAIGHT;
	else if (name ===  TILE_NAME['corner']) return TILE_TYPE_CORNER;
	else if (name ===  TILE_NAME['crossroads']) return TILE_TYPE_CROSSROADS;
	else if (name ===  TILE_NAME['tjunction']) return TILE_TYPE_TJUNCTION;
	else return null;
}

TileType.prototype.toString = function() {
	return this.name;
}

var TILE_TYPE_WALL = new TileType([], TILE_NAME['wall'], 0);
var TILE_TYPE_SOURCE = new TileType([DIRECTION_RIGHT], TILE_NAME['source'], 0);
var TILE_TYPE_DESTINATION = new TileType([DIRECTION_LEFT], TILE_NAME['destination'], 0);
var TILE_TYPE_STRAIGHT = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT], TILE_NAME['straight'], TILE_POINT_VALUE['straight']);
var TILE_TYPE_CORNER = new TileType([DIRECTION_LEFT, DIRECTION_DOWN], TILE_NAME['corner'], TILE_POINT_VALUE['corner']);
var TILE_TYPE_CROSSROADS = new TileType([DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN], TILE_NAME['crossroads'], TILE_POINT_VALUE['crossroads']);
var TILE_TYPE_TJUNCTION = new TileType([DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN], TILE_NAME['tjunction'], TILE_POINT_VALUE['tjunction']);

var PLACEABLE_TILE_TYPES = [TILE_TYPE_STRAIGHT,
                            TILE_TYPE_CORNER,
                            TILE_TYPE_CROSSROADS,
                            TILE_TYPE_TJUNCTION];