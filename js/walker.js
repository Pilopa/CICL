//=== Walker ===

/**
 * Diese Klasse ist zuständig für das Abarbeiten der einzelnen Startpunkte und deren Verlauf.<br>
 * Außerdem löst sie die entsprechenden Events aus, die währenddessen auftreten.
 * 
 * @author Steffen Müller
 */
 
function Walker(tile, ele, lvl, cf, run) {
	this.where = tile;		// aktuelles Tile
	this.element = ele;
	this.comingfrom = cf; 		// Exit des aktuellen Tiles, durch den das Tile betreten wurde
	this.level = lvl;
	this.running = run;
	
	this.tilesize = Math.floor(parseInt($('#field').css('width'))/this.level.width);
	this.flowwidth = Math.floor((this.tilesize*3)/10)-1;
	this.flowoffset = Math.floor((this.tilesize - this.flowwidth)/2);
	
	this.level.walkers.push(this);
}

Walker.prototype.walk = function() {
	if(this.running) {
		if(!this.checkElement()) {
			return;
		}
		if(this.where.type.name == TILE_NAME_DESTINATION) {
			var walker = this;
			this.animateDest(function() {walker.level.destinationReached(this.where);});
			return;
		}
		this.setElementEntry();
		this.animateFlow(this);
	}
}

Walker.prototype.checkElement = function() {
	var cf = this.comingfrom;
	if(this.where.type.name == TILE_NAME_SOURCE) {
		cf = 0;
	}
	if(this.where.getElement(cf) == 'undefined' || this.where.getElement(cf) == this.element || this.where.getElement(cf) == TILE_ELEMENT_NONE) {
		return true;
	} else {
		this.testFailed(this.where, this.element + ' meets ' + this.where.getElement(cf) + ' at entry'); // Verschiedene Elemente kollidieren!
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
				new Walker(this.level.getNeighbor(this.where, exit), this.element, this.level, (exit+2)%4, this.running).walk();
			}
			break;
		default: 
			for(var i = 0; i < this.where.type.initialExits.length; i++) {
				var exits = this.where.getExits();
				if(exits[i] != this.comingfrom) {
					if(this.assertExit(exits[i])) {
						this.where.setElement(exits[i], this.element);
						new Walker(this.level.getNeighbor(this.where, exits[i]), this.element, this.level, (exits[i]+2)%4, this.running).walk();
					}
				}
			}
	}
	console.log('stopping at onward(): ' + this.where);
	this.stop();
}

Walker.prototype.assertExit = function(dir) {
	var neighbor = this.level.getNeighbor(this.where, dir);
		if(neighbor == null) {
			this.testFailed(this.where, 'empty neighbor from ' + this.where + ' to ' + dir); // Nachbarfeld ist leer!
			return false;
		}
		nexits = neighbor.getExits();
		for(var i = 0; i < nexits.length; i++) {
			if((dir+2)%4 == nexits[i]) {
				if(this.element == neighbor.getElement(dir) && neighbor.type.name != TILE_NAME_DESTINATION) {
					console.log('same element ' + this.element + ' on ' + this.where + ' and neighbor ' + neighbor + ', aborting'); // Trifft auf Fluss gleichen Elements
					this.stop();
					this.abort();
					return false;
				}
				return true;
			}
		}
		this.testFailed(this.where, 'no entry to ' + neighbor); // Nachbartile hat keinen passend ausgerichteten Eingang!
		return false;
}

Walker.prototype.animateFlow = function(walker) {
	switch(this.where.type.name) {
		case TILE_NAME_SOURCE:
			$(document.createElement('div'))
				.addClass(this.element)
				.addClass('flow')
				.appendTo('.x' + this.where.x + '.y' + this.where.y)
				.css('height', this.flowwidth + 'px')
				.css('top', this.flowoffset + 'px')
				.css('left', this.tilesize/2 + 'px')
				.animate({width: this.tilesize/2 + 'px'}, 1000, 'linear', function() {walker.onward();});
			break;
		case TILE_NAME_STRAIGHT:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.animate({width: this.tilesize + 'px'}, 2000, 'linear', function() {walker.onward();});
					break;
				case 1:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.css('right', '0')
						.animate({width: this.tilesize + 'px'}, 2000, 'linear', function() {walker.onward();});
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
						.css('right', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.tilesize-this.flowoffset + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', walker.flowwidth + 'px')
								.css('bottom', walker.flowoffset + 'px')
								.css('right', walker.flowoffset + 'px')
								.animate({width: walker.tilesize-walker.flowoffset + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('bottom', this.flowoffset)
						.css('left', '0')
						.css('height', this.flowwidth + 'px')
						.animate({width: this.tilesize-this.flowoffset + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.tilesize-walker.flowoffset + 'px'}, 1000, 'linear', function() {walker.onward();});
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
						.css('left', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.flowoffset + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.flowoffset + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
					break;
				case 1:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.css('right', '0')
						.animate({width: this.tilesize + 'px'}, 2000, 'linear', function() {walker.onward();});
					break;
				case 2:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('bottom', '0')
						.css('left', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.flowoffset + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.flowoffset + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.animate({width: this.tilesize + 'px'}, 2000, 'linear', function() {walker.onward();});
			}
			break;
		case TILE_NAME_TJUNCTION:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 0:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('width', this.flowwidth + 'px')
						.css('top', '0')
						.css('left', this.flowoffset + 'px')
						.animate({height: this.flowoffset+this.flowwidth + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, 1000, 'linear', function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', walker.flowwidth + 'px')
								.css('top', walker.flowoffset + 'px')
								.css('right', walker.flowoffset)
								.animate({width: walker.flowoffset+walker.flowwidth + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
					break;
				case 2:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('width', this.flowwidth + 'px')
						.css('bottom', '0')
						.css('left', this.flowoffset + 'px')
						.animate({height: this.flowoffset+this.flowwidth + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, 1000, 'linear', function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('height', walker.flowwidth + 'px')
								.css('top', walker.flowoffset + 'px')
								.css('right', walker.flowoffset)
								.animate({width: walker.flowoffset+walker.flowwidth + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					$(document.createElement('div'))
						.addClass(this.element)
						.addClass('flow')
						.appendTo('.x' + this.where.x + '.y' + this.where.y)
						.css('height', this.flowwidth + 'px')
						.css('bottom', this.flowoffset + 'px')
						.css('left', '0')
						.animate({width: this.flowoffset+this.flowwidth + 'px'}, 1000, 'linear', function() {
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, 1000, 'linear', function() {});
							$(document.createElement('div'))
								.addClass(walker.element)
								.addClass('flow')
								.appendTo('.x' + walker.where.x + '.y' + walker.where.y)
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.css('right', walker.flowoffset)
								.animate({height: walker.flowoffset + 'px'}, 1000, 'linear', function() {walker.onward();});
						});
			}
	}
}

Walker.prototype.animateDest = function(callback) {
	$(document.createElement('div'))
		.addClass(this.element)
		.addClass('flow')
		.appendTo('.x' + this.where.x + '.y' + this.where.y)
		.css('height', this.flowwidth + 'px')
		.css('top', this.flowoffset + 'px')
		.css('left', '0')
		.animate({width: this.tilesize/2 + 'px'}, 1000, 'linear', callback);
}

Walker.prototype.stop = function() {
	this.running = false;
}

Walker.prototype.abort = function() {
	var cont = false;
	for(var i = 0; i < this.level.walkers.length; i++) {
		cont = cont || this.level.walkers[i].running;
	}
	console.log('abort(): ' + cont);
	if(!cont) {
		this.testFailed(this.where, 'no more active walkers, last walker on ' + this.where);
	}
}

Level.prototype.testFailed = function (tile, msg) {
	this.stop();
	this.level.fireEvent(new Event(EVENT_TYPE_TEST_FAILED,tile,msg));
}