//=== Walker ===

/**
 * Diese Klasse ist zuständig für das Abarbeiten der einzelnen Startpunkte und deren Verlauf.<br>
 * Außerdem löst sie die entsprechenden Events aus, die währenddessen auftreten.
 * 
 * @author Steffen Müller
 */

function Walker(tile, ele, lvl) {
	var where = tile;		// aktuelles Tile
	var element = ele;
	var comingfrom; 		// Exit des aktuellen Tiles, durch den das Tile betreten wurde
	var level = lvl;
}

Walker.prototype.walk = function() {
	this.checkElement();
	if(this.where.type == TILE_TYPE_DESTINATION) {
		this.level.destinationReached(this.where);
		return;
	}
	this.setElement();
	this.onward();
}

Walker.prototype.checkElement = function() {
	if(where.element = this.element || where.element == 0) {
		return true;
	} else {
		this.playfield.testFailed(); // Verschiedene Elemente kollidieren!
		return false;
	}
}

Walker.prototype.setElement = function() {
	where.element = this.element;
}

Walker.prototype.onward = function() {
	switch(where.type) {
		case TILE_TYPE_CROSSROADS:
			var exit = (this.where.comingfrom+2)%4;
			if(this.assertExit(exit)) {
				new Walker(this.level.getNeighbor(this.where, exit), this.element, this.playfield).walk();
			}
			break;
		default: 
			for(var i = 0; i < this.where.initialExits.length; i++) {
				var exit = (this.where.initialExits[i]+this.where.rotation)%4;
				if(exit != this.comingfrom) {
					if(this.assertExit(exit)) {
						new Walker(this.level.getNeighbor(this.where, exit), this.element, this.playfield).walk();
					}
				}
			}
	}
}

Walker.prototype.assertExit = function(dir) {
	var neighbor = this.level.getNeighbor(where, exit);
		if(neighbor == null) {
			this.playfield.testFailed(); // Nachbarfeld ist leer!
			return;
		}
		if(!(exit+2)%4 in neighbor.type.exits) {
			this.playfield.testFailed(); // Nachbartile hat keinen passend ausgerichteten Eingang!
		}
}

Walker.prototype.startRun = function(level) {
	for(var i = 0; i < level.height; i++) {
		for(var j = 0; j < level.width; j++) {
			if(level.playfield[i][j].type = TILE_TYPE_SOURCE) {
				new Walker(level.playfield[i][j], level.playfield[i][j].type, level).walk();
			}
		}
	}
	if (level.destinationsCount <= level.destinationsReached) {
		fireEvent(new Event(EVENT_TYPE_TEST_COMPLETED));
	}
}