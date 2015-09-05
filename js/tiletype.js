/**
 * Kümmert sich um alles, was mit TileTypes zu tun hat.
 *
 * @see 'tile.js'
 */
 
//================================================================================================

/**
 * Definiert die Punktewerte der einzelnen TileTypes.
 * Diese Punkte werden zur Bewertung des Spielers benötigt.
 * 
 * @constant
 */
var TILE_POINT_VALUE = {
	'basic': 10, //Gibt den Standardpunktwert für ein Tile an. Dieser wird verwendet, wenn sonst kein Punktewert angegeben wird.
	'straight': 10,
	'corner': 15,
	'crossroads': 40,
	'tjunction': 25
}

/**
 * TileType-Objekte können im Kontext von HTML nicht verwendet werden (als Klassen oder IDs).
 * Zu diesem Zweck ist diese Map definiert.
 *
 * @constant
 */
var TILE_NAME = {
	'wall': 'wall',
	'source': 'source',
	'destination': 'destination',
	'straight': 'straight',
	'corner': 'corner',
	'crossroads': 'crossroads',
	'tjunction': 'tjunction'
}

/**
 * Dem Spieler stehen endlos viele Werkzeuge eines Types zur Verfügung, wenn diese Konstante angegeben wird.
 */
var TILE_AMOUNT_ENDLESS = -1;

function TileType(exits, name, pointValue) {
	if (!exits) exits = [];
	if (!pointValue) pointValue = TILE_POINT_VALUE['basic'];
	this.initialExits = exits;
	this.pointValue = pointValue;
	this.name = name;
}

/**
 * Wandelt, ähnlich wie bei einer Enumeration, einen String in ein TileType-Objekt um.
 *
 * @param {string} name Stringrepräsentation des gesuchten Typen.
 * @return Den dem angegebenen namen entsprechenden TileType oder null, falls keine Übereinstimmung gefunden wurde.
 */
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

/**
 * Der Konstruktor von TileType kann zwar überall aufgerufen werden,
 * im Kontext unserer Anwendung ist diese 'Klasse' jedoch ein Enumeration Type.
 *
 * @enum
 * @constant
 */
var TILE_TYPE = {
	'wall': new TileType([], TILE_NAME['wall'], 0),
	'source': new TileType([DIRECTION['right']], TILE_NAME['source'], 0),
	'destination': new TileType([DIRECTION['left']], TILE_NAME['destination'], 0),
	'straight': new TileType([DIRECTION['left'], DIRECTION['right']], TILE_NAME['straight'], TILE_POINT_VALUE['straight']),
	'corner': new TileType([DIRECTION['left'], DIRECTION['down']], TILE_NAME['corner'], TILE_POINT_VALUE['corner']),
	'crossroads': new TileType([DIRECTION['left'], DIRECTION['right'], DIRECTION['up'], DIRECTION['down']], TILE_NAME['crossroads'], TILE_POINT_VALUE['crossroads']),
	'tjunction': new TileType([DIRECTION['left'], DIRECTION['up'], DIRECTION['down']], TILE_NAME['tjunction'], TILE_POINT_VALUE['tjunction']),
}

/**
 * Definiert alle GRUNDSÄTZLICH vom Spieler verwendbaren TileTypes.
 *
 * @see ToolBox in 'levelview.js'
 * @constant
 */
var PLACEABLE_TILE_TYPES = [TILE_TYPE['straight'],
                            TILE_TYPE['corner'],
                            TILE_TYPE['crossroads'],
                            TILE_TYPE['tjunction']];