/**
 * Das Level ist das Hauptdatenmodell unseres Spiels.
 * In 'levelview.js' wird dieses Modell dargestellt und der Spieler kann damit interagieren.
 * Das Datenmodell feuert Events, auf welche per 'registerListener' gehorcht werden kann.
 * Ansonsten sind die meisten Methoden auch für die Leveldefinition ('stages.js') wichtig.
 *
 * @classdesc
 * @requires 'event.js'
 * @requires 'tile.js'
 */
 
 //=========================================================================================

 /**
  * Erstellt ein Level-Objekt.
  *
  * @param {number} width Die Breite des Levels.
  * @param {number} height Die Höhe des Levels.
  * @param {object} tools Das Objekt enhält für jeden TileType-Namen (z.b. 'straight') eine Anzahl der platzierbaren Objekte. 
  * 	@see TILE_AMOUNT_ENDLESS (in TileType)
  *		Wenn ein TileType nicht angegeben wird, ist er nicht verfügbar.
  * @param {array} tools Die breite des Levels.
  * @constructor
  */
function Level(width, height, title, tools, optimalPointValue, divi) {
	if(typeof tools === 'undefined') tools = {};
	if (optimalPointValue === undefined) optimalPointValue = 0;
	if (divi === undefined) divi = 20;
	this.width = width;
	this.height = height;
	this.playfield = [];
	for (var y = 0; y < height; y++) this.playfield[y] = []; //Initialisieren der Spielfeld-Matrix
	this.handlers = [];
	this.destinationsCount = 0;
	this.destinationsReached = 0;
	this.optimalPointValue = optimalPointValue;
	this.title = title;
	this.score = 0;
	this.starDivisor = divi; // Je höher dieser Wert, desto dichter muss man an der Optimallösung sein um viele Sterne zu bekommen
	this.tools = tools;
	this.walkers = [];
	this.aborttimer;
}

/**
 * @return {number} Die Summe der Punktewerte aller verfügbaren Werkzeuge.
 * @see tools
 */
Level.prototype.getMaxPointValue = function () {
	var result = 0;
	//
	for (var tiletypename in this.tools) {
		var tiletype = TileType.byName(tiletypename);
		result += tiletype.pointValue * this.tools[tiletypename];
	}
	//
	return result;
}

/**
 * @return {number} Summe der Punktewerte aller platzierten Tiles.
 */
Level.prototype.getPlacedPointValue = function () {
	var result = 0;
	for(var y = 0; y < this.height; y++) 
		for(var x = 0; x < this.width; x++) 
			if(!this.isEmpty(x, y) && this.getTile(x,y).movable) 
				result += this.getTile(x,y).type.pointValue;
	
	return result;
}

/**
 * 
 * @param {number} y Die y-Koordinate des gewünschten Feldes.
 * @param {number} x Die x-Koordinate des gewünschten Feldes.
 * @return {Tile} Das Tile an der bestimmten Position.
 */
Level.prototype.getTile = function(x, y) {
	if (typeof x !== 'number') /*throw "x not a number: " + x + ' in getTile()'*/ console.log("x not a number: " + x + ' in getTile()');
	if (typeof y !== 'number') /*throw "y not a number: " + y + ' in getTile()'*/ console.log("y not a number: " + y + ' in getTile()');
	if(x >= this.width || y >= this.height) return null;
	return this.playfield[y][x];
}

/**
 * @return {boolean} Feld ist leer.
 */
Level.prototype.isEmpty = function (x, y) {
	if (typeof x === 'undefined') throw "x has to be set in Levels isEmpty method";
	if (typeof y === 'undefined') throw "y has to be set in Levels isEmpty method";
	return (this.getTile(x,y) === null || this.getTile(x,y) === undefined);
}

/**
 * @param {TileType} tiletype Der zu überprüfende Typ.
 * @return {number} Anzahl der platzierten Tiles eines TileTypes.
 */
Level.prototype.getAmountPlaced = function (tiletype) {
	var counter = 0;
	for (var y = 0; y < this.height; y++)
		for (var x = 0; x < this.width; x++) 
			if (!this.isEmpty(x, y) && this.getTile(x, y).type === tiletype) counter++;
	return counter;
}

/**
 * Platziert ein neues Tile an der gewünschten Position.
 * Überschreibt eventuell platzierte Tiles.
 *
 * @param {number} x Die x-Koordinate, an welcher eingefügt werden soll.
 * @param {number} y Die y-Koordinate, an welcher eingefügt werden soll.
 * @param {number} r Die initiale Rotation des Tiles.
 * @param {Tile} tile Das einzufügende Tile.
 * @param {boolean} fireEvents Sollen Events ausgelöst werden ?
 * 		@see 'stages.js' oder 'levelview.js' für entsprechende Beispiele.
 * @return Das Level-Objekt (für Method-Chaining)
 * @fires EVENT_TYPE.placed
 */
Level.prototype.put = function (x, y, r, tile, fireEvents) {
	if (typeof fireEvents === 'undefined') fireEvents = false;
	if (this.getTile(x,y) !== null && this.getTile(x,y) !== undefined) this.remove(x, y);
	tile.x = x;
	tile.y = y;
	tile.rotation = r;
	this.playfield[y][x] = tile;
	if (tile.type.name == TILE_NAME['destination']) this.destinationsCount++;
	if (fireEvents) this.fireEvent(new Event(EVENT_TYPE['placed'], tile));
	return this;
}

/**
 * Lässt die Tiles an den zwei Positionen die Plätze tauschen.
 * @param {number} x1 Die x-Koordinate des ersten Tiles.
 * @param {number} y1 Die y-Koordinate des ersten Tiles.
 * @param {number} x2 Die x-Koordinate des zweiten Tiles.
 * @param {number} y2 Die y-Koordinate des zweiten Tiles.
 * @fires EVENT_TYPE.swapped
 * @return Das Level-Objekt
 */
Level.prototype.swap = function (x1, y1, x2, y2) {
	if (x1 === undefined) console.log("error in swap in level.fs eventHandler: x1 is undefined");
	if (x2 === undefined) console.log("error in swap in level.fs eventHandler: x2 is undefined");
	if (y1 === undefined) console.log("error in swap in level.fs eventHandler: y1 is undefined");
	if (y2 === undefined) console.log("error in swap in level.fs eventHandler: y2 is undefined");
	//Merken der Tiles
	var tileFrom = this.getTile(x1, y1);
	var tileTo = this.getTile(x2, y2);
	
	//Ausgangstile
	if (tileFrom !== null && tileFrom !== undefined) {
		tileFrom.x = x2;
		tileFrom.y = y2;
	}
	this.playfield[y2][x2] = tileFrom;
	
	//Zieltile
	if (tileTo !== null && tileTo !== undefined) {
		tileTo.x = x1;
		tileTo.y = y1;
	}
	this.playfield[y1][x1] = tileTo;

	//Events
	this.fireEvent(new Event(EVENT_TYPE['swapped'], {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	}))
	return this;
}

/**
 * Löscht das Tile an der angegebenen Position.
 *
 * @fires EVENT_TYPE.removed
 * @return Das Level-Objekt
 */
Level.prototype.remove = function (x, y) {
	var tile = this.getTile(x,y);
	this.playfield[y][x] = null;
	this.fireEvent(new Event(EVENT_TYPE['removed'], tile));
	return this;
}

/**
 * Dreht das Tile an der angegebenen Position um 90° nach rechts.
 * @param {number} y Die y-Koordinate des gewünschten Feldes.
 * @param {number} x Die x-Koordinate des gewünschten Feldes.
 */
Level.prototype.rotate = function (x, y) {
	var tile = this.getTile(x,y);
	tile.rotate(1);
	this.fireEvent(new Event(EVENT_TYPE['rotated'], tile));
	return this;
}

/**
 * @param {Tile} tile Das Zieltile
 * @param {DIRECTION} dir Die Richtung, in welcher nach einem Nachbarn gesucht werden soll.
 * @return {Tile} Der Nachbar des Tiles in der angegebenen Richtung
 * @fires EVENT_TYPE.testfailed
 */
Level.prototype.getNeighbor = function (tile, dir) {
	var nx = tile.x;
	var ny = tile.y;
	switch(dir) {
		case 0:
			ny -= 1;
			if(ny < 0) {
				this.fireEvent(new Event(EVENT_TYPE['testfailed'], tile, 'Spielfeldrand erreicht'));
			}
			break;
		case 1:
			nx += 1;
			if(nx >= this.width) {
				this.fireEvent(new Event(EVENT_TYPE['testfailed'], tile, 'Spielfeldrand erreicht'));
			}
			break;
		case 2:
			ny += 1;
			if(ny >= this.height) {
				this.fireEvent(new Event(EVENT_TYPE['testfailed'], tile, 'Spielfeldrand erreicht'));
			}
			break;
		case 3:
			nx -= 1;
			if(nx < 0) {
				this.fireEvent(new Event(EVENT_TYPE['testfailed'], tile, 'Spielfeldrand erreicht'));
			}
	}
	return this.getTile(nx, ny);
}

Level.prototype.registerListener = function (handler) {
	this.handlers.push(handler);
}

Level.prototype.removeListener = function (handler) {
	var index = this.handlers.indexOf(handler);
	if (index > -1) this.handlers.splice(index, 1);
}

Level.prototype.fireEvent = function (evt) {
	this.handlers.forEach(function(currentValue, index, array) {
		currentValue(evt);
	});
}

/**
 * Startet einen Testlauf.
 */
Level.prototype.startRun = function() {
	for(var y = 0; y < this.height; y++) 
		for(var x = 0; x < this.width; x++) 
			if(!this.isEmpty(x, y) && this.getTile(x, y).type.name == TILE_NAME['source']) 
				new Walker(this.getTile(x, y), this.getTile(x, y).elements[this.getTile(x, y).getExits()[0]], this, 'undefined', true).walk();
	
	var temp = this;
	this.aborttimer = setInterval(function(){temp.abort();}, 1000);
}

/**
 * Wird periodisch durch den aborttimer aufgerufen.
 * Überprüft, ob während des Tests ein Fehler aufgetreten ist und bricht diesen ggf. ab.
 */
Level.prototype.abort = function(obj) {
		var cont = false;
		for(var i = 0; i < this.walkers.length; i++) {
			cont = cont || this.walkers[i].running;
		}
		if(!cont) {
			this.fireEvent(new Event(EVENT_TYPE['testfailed'], undefined, 'no more active walkers'));
		}
}

/**
 * Löscht die Fließ-Animation auf allen Tiles.
 */
Level.prototype.clearElements = function() {
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			if(!this.isEmpty(x,y)) {
				var tile = this.getTile(x, y);
				if(tile.type.name != TILE_NAME['destination'] && tile.type.name != TILE_NAME['source']) {
					tile.setElement(0, TILE_ELEMENT['none']);
					tile.setElement(1, TILE_ELEMENT['none']);
					tile.setElement(2, TILE_ELEMENT['none']);
					tile.setElement(3, TILE_ELEMENT['none']);
				}
			}
		}
	}
}

/**
 * Beendet einen Testlauf manuell.
 */
Level.prototype.endRun = function() {
	clearInterval(this.aborttimer);
	for(var i = 0; i < this.walkers.length; i++) this.walkers[i].stop();
}