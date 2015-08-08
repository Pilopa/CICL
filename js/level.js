//=== Level ===

function Level(width, height, title, tools) {
	if(typeof tools === 'undefined') tools = {};
	this.width = width;
	this.height = height;
	this.playfield = [];
	for (var x = 0; x < width; x++) this.playfield[x] = []; //Initialisieren der Spielfeld-Matrix
	this.handlers = [];
	this.destinationsCount = 0;
	this.destinationsReached = 0;
	this.reachedDestinations = [];
	this.title = title;
	this.score = 0;
	this.tools = tools;
}

Level.prototype.isEmpty = function (x, y) {
	if (typeof x === 'undefined') throw "x has to be set in Levels isEmpty method";
	if (typeof y === 'undefined') throw "y has to be set in Levels isEmpty method";
	return (this.playfield[x][y] === null || this.playfield[x][y] === undefined || this.playfield[x][y] === "__hydrate_undef");
}

Level.prototype.put = function (x, y, r, tile, fireEvents) {
	if (typeof fireEvents === 'undefined') fireEvents = false;
	if (this.playfield[x][y] !== null && this.playfield[x][y] !== undefined && this.playfield[x][y] !== "__hydrate_undef") this.remove(x, y);
	tile.x = x;
	tile.y = y;
	tile.rotation = r;
	this.playfield[x][y] = tile;
	if (tile.type.name == TILE_NAME_DESTINATION) this.destinationsCount++;
	if (fireEvents) this.fireEvent(new Event(EVENT_TYPE_PLACED, tile));
	return this;
}

Level.prototype.swap = function (x1, y1, x2, y2) {
	if (x1 === undefined) console.log("error in swap in level.fs eventHandler: x1 is undefined");
	if (x2 === undefined) console.log("error in swap in level.fs eventHandler: x2 is undefined");
	if (y1 === undefined) console.log("error in swap in level.fs eventHandler: y1 is undefined");
	if (y2 === undefined) console.log("error in swap in level.fs eventHandler: y2 is undefined");
	var tileFrom = this.playfield[x1][y1];
	var tileTo = this.playfield[x2][y2];
	//Ausgangstile
	if (tileFrom !== null && tileFrom !== undefined && tileFrom !== "__hydrate_undef") {
		tileFrom.x = x2;
		tileFrom.y = y2;
	}
	this.playfield[x2][y2] = tileFrom;
	
	//Zieltile
	if (tileTo !== null && tileTo !== undefined && tileTo !== "__hydrate_undef") {
		tileTo.x = x1;
		tileTo.y = y1;
	}
	this.playfield[x1][y1] = tileTo;

	//Events
	this.fireEvent(new Event(EVENT_TYPE_SWAPPED, {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	}))
	return this;
}

Level.prototype.remove = function (x, y) {
	var tile = this.playfield[x][y];
	this.playfield[x][y] = null;
	this.fireEvent(new Event(EVENT_TYPE_REMOVED, tile));
	return this;
}

Level.prototype.rotate = function (x, y) {
	var tile = this.playfield[x][y];
	tile.rotate(1);
	this.fireEvent(new Event(EVENT_TYPE_ROTATED, tile));
	return this;
}

Level.prototype.getNeighbor = function (tile, dir) {
	var nx = tile.x;
	var ny = tile.y;
	switch(dir) {
		case 0:
			nx -= 1;
			if(nx < 0) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 1:
			ny += 1;
			if(ny >= this.width) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 2:
			nx += 1;
			if(nx >= this.heigth) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 3:
			ny -= 1;
			if(ny < 0) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
	}
	return this.playfield[nx][ny];
}

Level.prototype.testFailed = function () {
	this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED));
}

Level.prototype.destinationReached = function (tile) {
	for(var i = 0; i < this.reachedDestinations.length; i++) {
		if(this.reachedDestinations[i].samePosAs(tile)) {
			return;
		}
	}
	this.reachedDestinations.push(tile);
	this.destinationsReached++;
	this.fireEvent(new Event(EVENT_TYPE_DESTINATION_REACHED, tile));
}

Level.prototype.registerListener = function (handler) {
	this.handlers.push(handler);
}

Level.prototype.fireEvent = function (evt) {
	this.handlers.forEach(function(currentValue, index, array) {
		currentValue(evt);
	});
}

Level.prototype.startRun = function() {
	for(var i = 0; i < this.height; i++) {
		for(var j = 0; j < this.width; j++) {
			if(this.playfield[i][j] != '__hydrate_undef' && this.playfield[i][j] != null) { 
				if(this.playfield[i][j].type.name == TILE_NAME_SOURCE) {
					new Walker(this.playfield[i][j], this.playfield[i][j].element, this).walk();
				}
			}
		}
	}
	if (this.destinationsCount <= this.destinationsReached) {
		this.fireEvent(new Event(EVENT_TYPE_TEST_COMPLETED));
	}
}