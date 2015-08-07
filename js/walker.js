//=== Walker ===

/**
 * Diese Klasse ist zuständig für das Abarbeiten der einzelnen Startpunkte und deren Verlauf.<br>
 * Außerdem löst sie die entsprechenden Events aus, die währenddessen auftreten.
 * 
 * @author Steffen Müller
 */

function Walker(tile, ele, lvl, cf) {
	this.where = tile;		// aktuelles Tile
	this.element = ele;
	this.comingfrom = cf; 		// Exit des aktuellen Tiles, durch den das Tile betreten wurde
	this.level = lvl;
}

Walker.prototype.walk = function() {
	this.checkElement();
	if(this.where.type.name == TILE_NAME_DESTINATION) {
		this.level.destinationReached(this.where);
		return;
	}
	this.setElement();
	this.onward();
}

Walker.prototype.checkElement = function() {
	if(this.where.element = this.element || this.where.element == 0) {
		return true;
	} else {
		this.level.testFailed(); // Verschiedene Elemente kollidieren!
		return false;
	}
}

Walker.prototype.setElement = function() {
	this.where.element = this.element;
}

Walker.prototype.onward = function() {
	switch(this.where.type.name) {
		case TILE_NAME_CROSSROADS:
			var exit = (this.where.comingfrom+2)%4;
			if(this.assertExit(exit)) {
				new Walker(this.level.getNeighbor(this.where, exit), this.element, this.level, (exits[i]+2)%4).walk();
			}
			break;
		default: 
			for(var i = 0; i < this.where.type.initialExits.length; i++) {
				var exits = this.where.getExits();
				if(exits[i] != this.comingfrom) {
					if(this.assertExit(exits[i])) {
						new Walker(this.level.getNeighbor(this.where, exits[i]), this.element, this.level, (exits[i]+2)%4).walk();
					}
				}
			}
	}
}

Walker.prototype.assertExit = function(dir) {
	var neighbor = this.level.getNeighbor(this.where, dir);
		if(neighbor == null || neighbor == '__hydrate_undef') {
			this.level.testFailed(); // Nachbarfeld ist leer!
			return false;
		}
		nexits = neighbor.getExits();
		for(var i = 0; i < nexits.length; i++) {
			if((dir+2)%4 == nexits[i]) return true;
		}
		this.level.testFailed(); // Nachbartile hat keinen passend ausgerichteten Eingang!
		return false;
}