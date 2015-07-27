//=== Level ===

function Level(width, height) {
	this.width = width;
	this.height = height;
	this.playfield = [];
	for (var x = 0; x < width; x++) this.playfield[x] = []; //Initialisieren der Spielfeld-Matrix
	this.handlers = [];
	this.destinationsCount = 0;
	this.destinationsReached = 0;
}

Level.prototype.put = function (x, y, tile, fireEvents) {
	if (fireEvents == null) fireEvents = true;
	tile.x = x;
	tile.y = y;
	this.playfield[x][y] = tile;
	if (tile.type == TILE_TYPE_DESTINATION) this.destinationsCount++;
	if (fireEvents) this.fireEvent(new Event(EVENT_TYPE_PLACED, tile));
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

Level.prototype.getNeighbor = function (tile, exit) {
	var nx = tile.x;
	var ny = tile.y;
	switch(exit) {
		case 0:
			ny -= 1;
			if(ny < 0) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 1:
			nx += 1;
			if(nx >= this.width) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 2:
			ny += 1;
			if(ny >= this.heigth) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
			break;
		case 3:
			nx -= 1;
			if(nx < 0) {
				this.testFailed(); // Rand des Spielfelds erreicht!
			}
	}
	return playfield[nx][ny];
}

Level.prototype.testFailed = function () {
	fireEvent(new Event(EVENT_TYPE_TEST_FAILED));
}

Level.prototype.destinationReached = function (tile) {
	this.destinationsReached++;
	this.fireEvent(new Event(EVENT_TYPE_DESTINATION_REACHED, tile));
	if (this.destinationsCount <= this.destinationsReached) ;
		fireEvent(new Event(EVENT_TYPE_TEST_COMPLETED));
}

Level.prototype.registerListener = function (handler) {
	this.handlers.push(handler);
}

Level.prototype.fireEvent = function (evt) {
	this.handlers.forEach(function(currentValue, index, array) {
		currentValue(evt);
	});
}