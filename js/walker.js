//=== Walker ===

/**
 * Diese Klasse ist zuständig für das Abarbeiten der einzelnen Startpunkte und deren Verlauf.<br>
 * Außerdem löst sie die entsprechenden Events aus, die währenddessen auftreten.
 * 
 * @author Steffen Müller
 */

function Walker(tile, ele, lvl) {
	this.where = tile;		// aktuelles Tile
	this.element = ele;
	this.comingfrom; 		// Exit des aktuellen Tiles, durch den das Tile betreten wurde
	this.level = lvl;
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
	switch(this.where.type) {
		case TILE_TYPE_CROSSROADS:
			var exit = (this.where.comingfrom+2)%4;
			if(this.assertExit(exit)) {
				new Walker(this.level.getNeighbor(this.where, exit), this.element, this.playfield).walk();
			}
			break;
		default: 
			alert(this.where);
			for(var i = 0; i < this.where.type.initialExits.length; i++) { //Cannot read property 'initialExits' of undefined
				var exit = (this.where.type.initialExits[i]+this.where.rotation)%4;
				if(exit != this.comingfrom) {
					if(this.assertExit(exit)) {
						new Walker(this.level.getNeighbor(this.where, exit), this.element, this.playfield).walk();
					}
				}
			}
	}
}

Walker.prototype.assertExit = function(dir) {
	var neighbor = this.level.getNeighbor(this.where, dir);
		if(neighbor == null) {
			this.level.testFailed(); // Nachbarfeld ist leer!
			return;
		}
		if(!(dir+2)%4 in neighbor.type.exits) {
			this.level.testFailed(); // Nachbartile hat keinen passend ausgerichteten Eingang!
		}
}