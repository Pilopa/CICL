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
	if(!this.checkElement()) {
		return;
	}
	if(this.where.type.name == TILE_NAME_DESTINATION) {
		this.level.destinationReached(this.where);
		return;
	}
	this.setElement();
	this.animateFlow();
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
		if(this.element == neighbor.element) {
			return false;
		}
		nexits = neighbor.getExits();
		for(var i = 0; i < nexits.length; i++) {
			if((dir+2)%4 == nexits[i]) return true;
		}
		this.level.testFailed(); // Nachbartile hat keinen passend ausgerichteten Eingang!
		return false;
}

Walker.prototype.animateFlow = function() {
	var TILE_WIDTH = parseInt($('#field').css('width'))/this.level.width;
	var TILE_HEIGHT = parseInt($('#field').css('height'))/this.level.height;
	var FLOW_WIDTH = 10;
	var FLOW_SIDE_OFFSET = (TILE_WIDTH - FLOW_WIDTH)/2;
	
	switch(this.where.type.name) {
		case TILE_NAME_SOURCE:
			$(document.createElement('div'))
				.addClass(this.where.element)
				.addClass('flow')
				.appendTo('.x' + this.where.x + '.y' + this.where.y)
				.css('height', FLOW_WIDTH + 'px')
				.css('top', FLOW_SIDE_OFFSET + 'px')
				.css('left', TILE_WIDTH/2 + 'px')
				.animate({width: TILE_WIDTH/2 + 'px'}, 2000, function() {});
			break;
		case TILE_NAME_STRAIGHT:
			switch((this.comingfrom-this.where.rotation)%4) {
				case 3:
					$(document.createElement('div'))
						.addClass(this.where.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_SIDE_OFFSET + 'px')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {});
					break;
				case 1:
					$(document.createElement('div'))
						.addClass(this.where.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_SIDE_OFFSET + 'px')
						.css('right', '0')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {});
			}
			break;
		case TILE_NAME_CORNER:
			switch((this.comingfrom-this.where.rotation)%4) {
				case 2:
					
					break;
				case 3:
					
			}
			break;
		case TILE_NAME_CROSSROADS:
			switch((this.comingfrom-this.where.rotation)%4) {
				case 0:
					
					break;
				case 1:
					
					break;
				case 2:
					
					break;
				case 3:
					
			}
			break;
		case TILE_NAME_TJUNCTION:
			switch((this.comingfrom-this.where.rotation)%4) {
				case 0:
					
					break;
				case 2:
					
					break;
				case 3:
					
			}
			break;
		case TILE_NAME_DESTINATION:
			
	}
}