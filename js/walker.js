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
		this.animateDest();
		this.level.destinationReached(this.where);
		return;
	}
	this.setElementEntry();
	this.animateFlow(this);
	//this.onward();
}

Walker.prototype.checkElement = function() {
	var cf = this.comingfrom;
	if(this.where.type.name == TILE_NAME_SOURCE) {
		cf = 0;
	}
	if(this.where.getElement(cf) == this.element || this.where.getElement(cf) == TILE_ELEMENT_NONE) {
		return true;
	} else {
		this.level.testFailed(this.element + ' meets ' + this.where.getElement(cf) + ' at entry'); // Verschiedene Elemente kollidieren!
		return false;
	}
}

Walker.prototype.setElementEntry = function() {
	this.where.setElement(this.comingfrom, this.element);
}

Walker.prototype.onward = function() {
	switch(this.where.type.name) {
		case TILE_NAME_CROSSROADS:
			var exit = (this.comingfrom+2)%4;
			if(this.assertExit(exit)) {
				this.where.setElement(exit, this.element);
				new Walker(this.level.getNeighbor(this.where, exit), this.element, this.level, (exit+2)%4).walk();
			}
			break;
		default: 
			for(var i = 0; i < this.where.type.initialExits.length; i++) {
				var exits = this.where.getExits();
				if(exits[i] != this.comingfrom) {
					if(this.assertExit(exits[i])) {
						this.where.setElement(exits[i], this.element);
						new Walker(this.level.getNeighbor(this.where, exits[i]), this.element, this.level, (exits[i]+2)%4).walk();
					}
				}
			}
	}
}

Walker.prototype.assertExit = function(dir) {
	var neighbor = this.level.getNeighbor(this.where, dir);
		if(neighbor == null || neighbor == '__hydrate_undef') {
			this.level.testFailed('empty neighbor from ' + this.where + ' to ' + dir); // Nachbarfeld ist leer!
			return false;
		}
		nexits = neighbor.getExits();
		for(var i = 0; i < nexits.length; i++) {
			if((dir+2)%4 == nexits[i]) {
				if(this.element == neighbor.getElement(dir) && neighbor.type.name != TILE_NAME_DESTINATION) {
					console.log('same element on neighbor, aborting');
					return false;
				}
				return true;
			}
		}
		this.level.testFailed('no entry to ' + neighbor); // Nachbartile hat keinen passend ausgerichteten Eingang!
		return false;
}

Walker.prototype.animateFlow = function(walker) {
	var TILE_WIDTH = parseInt($('#field').css('width'))/this.level.width;
	var TILE_HEIGHT = parseInt($('#field').css('height'))/this.level.height;
	var FLOW_WIDTH = 10;
	var FLOW_OFFSET = (TILE_WIDTH - FLOW_WIDTH)/2;

	switch(this.where.type.name) {
		case TILE_NAME_SOURCE:
			$(document.createElement('div'))
				.addClass(this.element)
				.addClass('flow')
				.appendTo('.x' + this.where.x + '.y' + this.where.y)
				.css('height', FLOW_WIDTH + 'px')
				.css('top', FLOW_OFFSET + 'px')
				.css('left', TILE_WIDTH/2 + 'px')
				.animate({width: TILE_WIDTH/2 + 'px'}, 2000, function() {walker.onward();});
			break;
		case TILE_NAME_STRAIGHT:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_OFFSET + 'px')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {walker.onward();});
					break;
				case 1:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_OFFSET + 'px')
						.css('right', '0')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {walker.onward();});
			}
			break;
		case TILE_NAME_CORNER:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 2:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('bottom', '0')
						.css('right', FLOW_OFFSET + 'px')
						.css('width', FLOW_WIDTH + 'px')
						.animate({height: TILE_WIDTH-FLOW_OFFSET + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', FLOW_WIDTH + 'px')
								.css('bottom', FLOW_OFFSET + 'px')
								.css('right', FLOW_OFFSET + 'px')
								.animate({width: TILE_WIDTH-FLOW_OFFSET + 'px'}, 1000, function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('bottom', FLOW_OFFSET)
						.css('left', '0')
						.css('height', FLOW_WIDTH + 'px')
						.animate({width: TILE_WIDTH-FLOW_OFFSET + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('top', FLOW_OFFSET + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.animate({height: TILE_WIDTH-FLOW_OFFSET + 'px'}, 1000, function() {walker.onward();});
						});
					break;
			}
			break;
		case TILE_NAME_CROSSROADS:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 0:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('top', '0')
						.css('left', FLOW_OFFSET + 'px')
						.css('width', FLOW_WIDTH + 'px')
						.animate({height: FLOW_OFFSET + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('top', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.animate({height: FLOW_OFFSET + 'px'}, 1000, function() {walker.onward();});
						});
					break;
				case 1:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_OFFSET + 'px')
						.css('right', '0')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {walker.onward();});
					break;
				case 2:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('bottom', '0')
						.css('left', FLOW_OFFSET + 'px')
						.css('width', FLOW_WIDTH + 'px')
						.animate({height: FLOW_OFFSET + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('bottom', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.animate({height: FLOW_OFFSET + 'px'}, 1000, function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('top', FLOW_OFFSET + 'px')
						.animate({width: TILE_WIDTH + 'px'}, 2000, function() {walker.onward();});
			}
			break;
		case TILE_NAME_TJUNCTION:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 0:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('width', FLOW_WIDTH + 'px')
						.css('top', '0')
						.css('left', FLOW_OFFSET + 'px')
						.animate({height: FLOW_OFFSET+FLOW_WIDTH + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.css('top', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.animate({height: FLOW_OFFSET}, 1000, function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', FLOW_WIDTH + 'px')
								.css('top', FLOW_OFFSET + 'px')
								.css('right', FLOW_OFFSET)
								.animate({width: FLOW_OFFSET+FLOW_WIDTH + 'px'}, 1000, function() {walker.onward();});
						});
					break;
				case 2:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('width', FLOW_WIDTH + 'px')
						.css('bottom', '0')
						.css('left', FLOW_OFFSET + 'px')
						.animate({height: FLOW_OFFSET+FLOW_WIDTH + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.css('bottom', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.animate({height: FLOW_OFFSET}, 1000, function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', FLOW_WIDTH + 'px')
								.css('top', FLOW_OFFSET + 'px')
								.css('right', FLOW_OFFSET)
								.animate({width: FLOW_OFFSET+FLOW_WIDTH + 'px'}, 1000, function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', FLOW_WIDTH + 'px')
						.css('bottom', FLOW_OFFSET + 'px')
						.css('left', '0')
						.animate({width: FLOW_OFFSET+FLOW_WIDTH + 'px'}, 1000, function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('left', FLOW_OFFSET + 'px')
								.css('bottom', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.animate({height: FLOW_OFFSET}, 1000, function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', FLOW_WIDTH + 'px')
								.css('top', FLOW_OFFSET+FLOW_WIDTH + 'px')
								.css('right', FLOW_OFFSET)
								.animate({height: FLOW_OFFSET + 'px'}, 1000, function() {walker.onward();});
						});
			}
	}
}

Walker.prototype.animateDest = function() {
	var TILE_WIDTH = parseInt($('#field').css('width'))/this.level.width;
	var TILE_HEIGHT = parseInt($('#field').css('height'))/this.level.height;
	var FLOW_WIDTH = 10;
	var FLOW_OFFSET = (TILE_WIDTH - FLOW_WIDTH)/2;
	
	$(document.createElement('div'))
		.addClass(this.element)
		.addClass('flow')
		.appendTo('.x' + this.where.x + '.y' + this.where.y)
		.css('height', FLOW_WIDTH + 'px')
		.css('top', FLOW_OFFSET + 'px')
		.css('left', '0')
		.animate({width: TILE_WIDTH/2 + 'px'}, 2000, function() {});
}