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

Level.prototype.put = function (x, y, r, tile, fireEvents) {
	if (typeof fireEvents === 'undefined') fireEvents = false;
	if (this.playfield[x][y] !== null && this.playfield[x][y] !== undefined) this.remove(x, y);
	tile.x = x;
	tile.y = y;
	tile.rotation = r;
	this.playfield[x][y] = tile;
	if (tile.type.name == TILE_NAME_DESTINATION) this.destinationsCount++;
	if (fireEvents) this.fireEvent(new Event(EVENT_TYPE_PLACED, tile));
	return this;
}

Level.prototype.swap = function (x1, y1, x2, y2) {
	console.log("swap: " + x1 + ", " + y1 + ", " + x2 + ", " + y2)
	//Ausgangstile
	var tileFrom = this.playfield[x1][y1];
	if (tileFrom !== undefined) {
		tileFrom.x = x2;
		tileFrom.y = y2;
	}
	this.playfield[x2][y2] = tileFrom;
	console.log(tileFrom);
	
	//Zieltile
	var tileTo = this.playfield[x2][y2];
	if (tileTo !== undefined) {
		tileTo.x = x1;
		tileTo.y = y1;
	}
	this.playfield[x1][y1] = tileTo;
	console.log(tileTo);
	
	//Events
	this.fireEvent(new Event(EVENT_TYPE_SWAPPED, {
		source: tileFrom,
		target: tileTo
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