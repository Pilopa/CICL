//=== Level ===

function Level(width, height, title, tools) {
	if(typeof tools === 'undefined') tools = {};
	this.width = width;
	this.height = height;
	this.playfield = [];
	for (var y = 0; y < height; y++) this.playfield[y] = []; //Initialisieren der Spielfeld-Matrix
	this.handlers = [];
	this.destinationsCount = 0;
	this.destinationsReached = 0;
	this.title = title;
	this.score = 0;
	this.tools = tools;
	this.walkers = [];
	this.aborttimer;
}

Level.prototype.getTile = function(x, y) {
	if (typeof x !== 'number') /*throw "x not a number: " + x + ' in getTile()'*/ console.log("x not a number: " + x + ' in getTile()');
	if (typeof y !== 'number') /*throw "y not a number: " + y + ' in getTile()'*/ console.log("y not a number: " + y + ' in getTile()');
	return this.playfield[y][x];
}

Level.prototype.isEmpty = function (x, y) {
	if (typeof x === 'undefined') throw "x has to be set in Levels isEmpty method";
	if (typeof y === 'undefined') throw "y has to be set in Levels isEmpty method";
	return (this.getTile(x,y) === null || this.getTile(x,y) === undefined);
}

Level.prototype.getAmountPlaced = function (tiletype) {
	var counter = 0;
	for (var y = 0; y < this.height; y++)
		for (var x = 0; x < this.width; x++) 
			if (!this.isEmpty(x, y) && this.getTile(x, y).type === tiletype) counter++;
	return counter;
}

Level.prototype.put = function (x, y, r, tile, fireEvents) {
	if (typeof fireEvents === 'undefined') fireEvents = false;
	if (this.getTile(x,y) !== null && this.getTile(x,y) !== undefined) this.remove(x, y);
	tile.x = x;
	tile.y = y;
	tile.rotation = r;
	this.playfield[y][x] = tile;
	if (tile.type.name == TILE_NAME['destination']) this.destinationsCount++;
	if (fireEvents) this.fireEvent(new Event(EVENT_TYPE_PLACED, tile));
	return this;
}

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
	this.fireEvent(new Event(EVENT_TYPE_SWAPPED, {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	}))
	return this;
}

Level.prototype.remove = function (x, y) {
	var tile = this.getTile(x,y);
	this.playfield[y][x] = null;
	this.fireEvent(new Event(EVENT_TYPE_REMOVED, tile));
	return this;
}

Level.prototype.rotate = function (x, y) {
	var tile = this.getTile(x,y);
	tile.rotate(1);
	this.fireEvent(new Event(EVENT_TYPE_ROTATED, tile));
	return this;
}

Level.prototype.getNeighbor = function (tile, dir) {
	var nx = tile.x;
	var ny = tile.y;
	switch(dir) {
		case 0:
			ny -= 1;
			console.log('getNeighbor(): ny == ' + ny);
			if(ny < 0) {
				this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED, tile, 'Spielfeldrand erreicht'));
				return false;
			}
			break;
		case 1:
			nx += 1;
			if(nx >= this.width) {
				this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED, tile, 'Spielfeldrand erreicht'));
				return false;
			}
			break;
		case 2:
			ny += 1;
			if(ny >= this.heigth) {
				this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED, tile, 'Spielfeldrand erreicht'));
				return false;
			}
			break;
		case 3:
			nx -= 1;
			if(nx < 0) {
				this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED, tile, 'Spielfeldrand erreicht'));
				return false;
			}
	}
	return this.getTile(nx, ny);
}

Level.prototype.destinationReached = function (tile) {
	this.destinationsReached++;
	this.fireEvent(new Event(EVENT_TYPE_DESTINATION_REACHED, tile));
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

Level.prototype.startRun = function() {
	for(var y = 0; y < this.height; y++) 
		for(var x = 0; x < this.width; x++) 
			if(!this.isEmpty(x, y) && this.getTile(x, y).type.name == TILE_NAME['source']) 
				new Walker(this.getTile(x, y), this.getTile(x, y).elements[this.getTile(x, y).getExits()[0]], this, 'undefined', true).walk();
	
	var temp = this;
	this.aborttimer = setInterval(function(){temp.abort();}, 1000);
}

Level.prototype.abort = function(obj) {
		var cont = false;
		for(var i = 0; i < this.walkers.length; i++) {
			cont = cont || this.walkers[i].running;
		}
		if(!cont) {
			this.fireEvent(new Event(EVENT_TYPE_TEST_FAILED, undefined, 'no more active walkers'));
		}
	}

Level.prototype.clearElements = function() {
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			if(!this.isEmpty(x,y)) {
				var tile = this.getTile(x, y);
				if(tile.type.name != TILE_NAME['destination'] && tile.type.name != TILE_NAME['source']) {
					tile.setElement(0, TILE_ELEMENT_NONE);
					tile.setElement(1, TILE_ELEMENT_NONE);
					tile.setElement(2, TILE_ELEMENT_NONE);
					tile.setElement(3, TILE_ELEMENT_NONE);
				}
			}
		}
	}
}