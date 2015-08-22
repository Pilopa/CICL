//=== Walker ===

/**
 * Diese Klasse ist zuständig für das Abarbeiten der einzelnen Startpunkte und den Fluss der Elemente.<br>
 * Außerdem löst sie die entsprechenden Events aus, die währenddessen auftreten.
 * 
 * @author Steffen Müller
 */
 
function Walker(tile, ele, lvl, cf, run) {
	this.where = tile;		// aktuelles Tile
	this.element = ele;		// fließendes Element
	this.comingfrom = cf; 		// Exit des aktuellen Tiles, durch den das Tile betreten wurde
	this.level = lvl;
	this.running = run;		// Ob der Walker noch aktiv weiterlaufen soll
	
	// Maße zum Darstellen der Animationen
	this.tilesize = Math.floor(parseInt($('#field').css('width'))/this.level.width);
	this.flowwidth = Math.floor((this.tilesize*3)/10)-1;
	this.flowoffset = Math.floor((this.tilesize - this.flowwidth)/2);
	this.animationTime = 1000;
	
	// Eintragen des walkers in das Level
	this.level.walkers.push(this);
}

// Grundlegende Ablaufroutine
Walker.prototype.walk = function() {
	if(this.running && this.checkElement()) {
		if(this.where.type.name == TILE_NAME['destination']) {
			var walker = this;
			this.animateDest(function() {walker.destinationReached();});
		return;
		}
		if(this.running) {
			this.setElementEntry();
		}
		if(this.running) {
			this.animateFlow(this);
		}
	}
}

// Überprüfung des aktuellen Tiles auf passendes Element
Walker.prototype.checkElement = function() {
	console.log('checkElement');
	var cf = this.comingfrom;
	if(this.where.type.name == TILE_NAME['source']) {
		return true;
	}
	if(typeof (this.where.getElement(cf)) !== 'string' || this.where.getElement(cf) === TILE_ELEMENT['none']) {
		return true;
	} else if (this.where.getElement(cf) == this.element && this.where.type.name != TILE_NAME['destination']) { // Element bereits vorhanden im comingfrom == ein anderer Walker war schon hier. Anhalten ohne Fehler.
		this.stop();
		return false; 
	} else if (this.where.getElement(cf) == this.element && this.where.type.name == TILE_NAME['destination']) { // Sonderfall für Destinations, da sie von Anfang an ein Element haben (das eine Element, das sie akzepteren nämlich)
		return true;
	} else {
		this.testFailed(this.where, this.element + ' (' + typeof(this.element) + ') meets ' + this.where.getElement(cf) + ' (' + typeof(this.where.getElement(cf)) + ') at entry'); // Verschiedene Elemente kollidieren!
		return false;
	}
}

Walker.prototype.stop = function() {
	this.running = false;
}

Walker.prototype.setElementEntry = function() {
	console.log('setElementEntry');
	this.where.setElement(this.comingfrom, this.element);
}

// Steuert den Übergang zum nächsten Tile
Walker.prototype.onward = function() {
	console.log('onward');
	switch(this.where.type.name) {
		case TILE_NAME['crossroads']:
			var exit = (this.comingfrom+2)%4;
			this.proceed(exit);
			break;
		default: 
			for(var i = 0; i < this.where.type.initialExits.length; i++) {
				var exits = this.where.getExits();
				if(exits[i] != this.comingfrom) {
					this.proceed(exits[i]);
				}
			}
	}
	this.stop();
}

// Erzeugt Walker auf passendem nächsten Tile
Walker.prototype.proceed = function(exit) {
	if(this.assertExit(exit)) {
		this.where.setElement(exit, this.element);
		new Walker(this.level.getNeighbor(this.where, exit), this.element, this.level, (exit+2)%4, this.running).walk();
	}
}

// Prüft Ausgang des aktuellen Tiles in angegebene Richtung, ob dort das Weiterfließen möglich ist
Walker.prototype.assertExit = function(dir) {
	console.log('assertExit');
	console.log(this.where + ', ' + dir);
	var neighbor = this.level.getNeighbor(this.where, dir);
		if(neighbor === null || neighbor === undefined) {
			this.testFailed(this.where, 'empty neighbor from ' + this.where + ' to ' + dir); // Nachbarfeld ist leer!
			return false;
		}
		nexits = neighbor.getExits();
		for(var i = 0; i < nexits.length; i++) {
			if((dir+2)%4 == nexits[i]) {
				return true;
			}
		}
		this.testFailed(this.where, 'no entry to ' + neighbor); // Nachbartile hat keinen passend ausgerichteten Eingang!
		return false;
}

// Grundlegende Eigenschaften der Fluss-Divs
Walker.prototype.makeFlow = function() {
	return $(document.createElement('div'))
		.addClass(this.element)
		.addClass('flow')
		.appendTo('.x' + this.where.x + '.y' + this.where.y);
}

// Darstellung der Fluss-Animation
Walker.prototype.animateFlow = function(walker) {
	console.log('animateFlow');
	switch(this.where.type.name) {
		case TILE_NAME['source']:
			this.makeFlow()
				.css('height', this.flowwidth + 'px')
				.css('top', this.flowoffset + 'px')
				.css('left', this.tilesize/2 + 'px')
				.animate({width: this.tilesize/2 + 'px'}, this.animationTime/2, 'linear', function() {walker.onward();});
			break;
		case TILE_NAME['straight']:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 3:
					this.makeFlow()
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.animate({width: this.tilesize + 'px'}, this.animationTime, 'linear', function() {walker.onward();});
					break;
				case 1:
					this.makeFlow()
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.css('right', '0')
						.animate({width: this.tilesize + 'px'}, this.animationTime, 'linear', function() {walker.onward();});
			}
			break;
		case TILE_NAME['corner']:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 2:
					this.makeFlow()
						.css('bottom', '0')
						.css('right', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.tilesize-this.flowoffset + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('height', walker.flowwidth + 'px')
								.css('bottom', walker.flowoffset + 'px')
								.css('right', walker.flowoffset+walker.flowwidth + 'px')
								.animate({width: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					this.makeFlow()
						.css('bottom', this.flowoffset)
						.css('left', '0')
						.css('height', this.flowwidth + 'px')
						.animate({width: this.tilesize-this.flowoffset + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
			}
			break;
		case TILE_NAME['crossroads']:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 0:
					this.makeFlow()
						.css('top', '0')
						.css('left', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.flowoffset + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
				case 1:
					this.makeFlow()
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.css('right', '0')
						.animate({width: this.tilesize + 'px'}, this.animationTime, 'linear', function() {walker.onward();});
					break;
				case 2:
					this.makeFlow()
						.css('bottom', '0')
						.css('left', this.flowoffset + 'px')
						.css('width', this.flowwidth + 'px')
						.animate({height: this.flowoffset + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.animate({height: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					this.makeFlow()
						.css('height', this.flowwidth + 'px')
						.css('top', this.flowoffset + 'px')
						.animate({width: this.tilesize + 'px'}, this.animationTime, 'linear', function() {walker.onward();});
			}
			break;
		case TILE_NAME['tjunction']:
			switch((4+(this.comingfrom-this.where.rotation))%4) {
				case 0:
					this.makeFlow()
						.css('width', this.flowwidth + 'px')
						.css('top', '0')
						.css('left', this.flowoffset + 'px')
						.animate({height: this.flowoffset+this.flowwidth + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, walker.animationTime/2, 'linear', function() {});
							walker.makeFlow()
								.css('height', walker.flowwidth + 'px')
								.css('top', walker.flowoffset + 'px')
								.css('right', walker.flowoffset+walker.flowwidth)
								.animate({width: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
				case 2:
					this.makeFlow()
						.css('width', this.flowwidth + 'px')
						.css('bottom', '0')
						.css('left', this.flowoffset + 'px')
						.animate({height: this.flowoffset+this.flowwidth + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, walker.animationTime/2, 'linear', function() {});
							walker.makeFlow()
								.css('height', walker.flowwidth + 'px')
								.css('top', walker.flowoffset + 'px')
								.css('right', walker.flowoffset+walker.flowwidth + 'px')
								.animate({width: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
					break;
				case 3:
					this.makeFlow()
						.css('height', this.flowwidth + 'px')
						.css('bottom', this.flowoffset + 'px')
						.css('left', '0')
						.animate({width: this.flowoffset+this.flowwidth + 'px'}, this.animationTime/2, 'linear', function() {
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('left', walker.flowoffset + 'px')
								.css('bottom', walker.flowoffset+walker.flowwidth + 'px')
								.animate({height: walker.flowoffset}, walker.animationTime/2, 'linear', function() {});
							walker.makeFlow()
								.css('width', walker.flowwidth + 'px')
								.css('top', walker.flowoffset+walker.flowwidth + 'px')
								.css('right', walker.flowoffset)
								.animate({height: walker.flowoffset + 'px'}, walker.animationTime/2, 'linear', function() {walker.onward();});
						});
			}
	}
}

// Gesonderte Animation für Destinations
Walker.prototype.animateDest = function(callback) {
	this.makeFlow()
		.css('height', this.flowwidth + 'px')
		.css('top', this.flowoffset + 'px')
		.css('left', '0')
		.animate({width: this.tilesize/2 + 'px'}, this.animationTime/2, 'linear', callback);
}

// Wirft Testabbruch-Event
Walker.prototype.testFailed = function (tile, msg) {
	this.stop();
	this.level.fireEvent(new Event(EVENT_TYPE['testfailed'],tile,msg));
}

Walker.prototype.destinationReached = function() {
	this.level.destinationsReached++;
	if (this.level.destinationsCount <= this.level.destinationsReached) {
		this.level.fireEvent(new Event(EVENT_TYPE['testcompleted']));
	} else {
		console.log('stopping on destination');
		this.stop();
	}
}