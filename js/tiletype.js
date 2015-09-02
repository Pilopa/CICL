/*
 * siehe 'tile.js'
 */

var TILE_POINT_VALUE = {
	'basic': 10, //Gibt den Standardpunktwert für ein Tile an. Dieser wird verwendet, wenn sonst kein Punktewert angegeben wird.
	'straight': 10,
	'corner': 15,
	'crossroads': 40,
	'tjunction': 25,
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
	if (name === TILE_NAME['wall']) return TILE_TYPE['wall'];
	else if (name === TILE_NAME['source']) return TILE_TYPE['source'];
	else if (name === TILE_NAME['destination']) return TILE_TYPE['destination'];
	else if (name === TILE_NAME['straight']) return TILE_TYPE['straight'];
	else if (name ===  TILE_NAME['corner']) return TILE_TYPE['corner'];
	else if (name ===  TILE_NAME['crossroads']) return TILE_TYPE['crossroads'];
	else if (name ===  TILE_NAME['tjunction']) return TILE_TYPE['tjunction'];
	else return null;
}

TileType.prototype.toString = function() {
	return this.name;
}

var TILE_TYPE = {
	'wall': new TileType([], TILE_NAME['wall'], 0),
	'source': new TileType([DIRECTION['right']], TILE_NAME['source'], 0),
	'destination': new TileType([DIRECTION['left']], TILE_NAME['destination'], 0),
	'straight': new TileType([DIRECTION['left'], DIRECTION['right']], TILE_NAME['straight'], TILE_POINT_VALUE['straight']),
	'corner': new TileType([DIRECTION['left'], DIRECTION['down']], TILE_NAME['corner'], TILE_POINT_VALUE['corner']),
	'crossroads': new TileType([DIRECTION['left'], DIRECTION['right'], DIRECTION['up'], DIRECTION['down']], TILE_NAME['crossroads'], TILE_POINT_VALUE['crossroads']),
	'tjunction': new TileType([DIRECTION['left'], DIRECTION['up'], DIRECTION['down']], TILE_NAME['tjunction'], TILE_POINT_VALUE['tjunction']),
}

var PLACEABLE_TILE_TYPES = [TILE_TYPE['straight'],
                            TILE_TYPE['corner'],
                            TILE_TYPE['crossroads'],
                            TILE_TYPE['tjunction']];