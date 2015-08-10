$(function() {
	
	//Globale Variablen
	var x = location.search.replace('?','').split('-');
	var levelid = x[0];
	var stageid = x[1];
	var level = getStages()[stageid].levels[levelid];
	
	//Funktionen
	function initializeTileViewHandlers(x, y) {
		var tileview = $(".x" + x + ".y" + y);
		tileview
		.draggable({
			revert: true,
			revertDuration: 0,
			scroll: false,
			start: function (event, ui) {
				ui.helper.addClass("drag-highlight");
			},
			stop: function (event, ui) {
				ui.helper.removeClass("drag-highlight");
			},
		})
		.click(function (event) { //Der Spieler klickt auf ein Tile, um es zu drehen.
			var classes = $(this).attr('class').split(" ");
			var x = parseInt(classes[1].replace("x", ""));
			var y = parseInt(classes[2].replace("y", ""));
			if (level.getTile(x, y) !== null && level.getTile(x, y) !== undefined && level.getTile(x, y).movable) level.rotate(x, y);
			else console.log("click but no rotate on [" + x + "|" + y + "]")
		})
		.addClass('interactable');
		return tileview;
	}
	
	function updateTileView(x, y, initializeHandlers) {
		if (x === undefined) console.log("error in updateTileView in levelview.fs: x is undefined");
		if (y === undefined) console.log("error in updateTileView in levelview.fs: y is undefined");
		var tile = level.getTile(x, y);
		var tileview = $(".x" + x + ".y" + y);
		if (tile !== null && tile !== undefined && tile !== "__hydrate_undef") {
			if (tile.type === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile.type is undefined: " + tile);
			if (tile === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile is undefined: " + tile);
			tileview.css('background-image', 'url(../images/' + tile.type.name + '.png)');
			var rot = 90 * parseInt(tile.rotation);
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
			if (initializeHandlers) initializeTileViewHandlers(x, y);
		} else {
			tileview
			.css('background-image', 'url(../images/empty.png)')
			.removeClass("interactable")
			.unbind()
			.draggable('destroy');
		}
		return tileview;
	}
	
	function updateToolNumber(tiletype) {
		var toolNumberView = $('#toolcount-' + tiletype.name);
		toolNumberView.text((level.tools[tiletype.name] === undefined || level.tools[tiletype.name] === "__hydrate_undef") ? ""
				:  ((level.tools[tiletype.name] === -1) ? "∞" : level.tools[tiletype.name] + "x")); //((level.tools[tiletype.name] === 0) ? "-" : //Falls bei genau 0 Tools ein anderer Text angezeigt werden sollte.
		if (level.tools[tiletype.name] > 0) 
			$("#" + tiletype.name)
			.draggable("enable")
			.addClass("interactable")
			.removeClass("non-interactable")
			.removeClass("immovable");
		else if (level.tools[tiletype.name] == 0) 
			$("#" + tiletype.name)
			.draggable("disable")
			.removeClass("interactable")
			.addClass("non-interactable")
			.addClass("immovable");
		return toolNumberView;
	}
	
	//Eventhandler initialisieren
	level.registerListener(function (event) {
		console.log(event.toString()); //DEBUG
		
		if (event.type === EVENT_TYPE_PLACED) { //Ein Tile wurde platziert.
			if (event.tile.x === undefined) console.log("error in levelview.fs eventHandler: event.tile.x is undefined");
			if (event.tile.y === undefined) console.log("error in levelview.fs eventHandler: event.tile.y is undefined");
			updateTileView(event.tile.x, event.tile.y, true);
			if(level.tools[event.tile.type.name] > 0) level.tools[event.tile.type.name] -= 1;
			updateToolNumber(event.tile.type);
		} else if (event.type === EVENT_TYPE_ROTATED) { //Ein Tile wurde gedreht.
			updateTileView(event.tile.x, event.tile.y);
		} else if (event.type === EVENT_TYPE_REMOVED) { //Ein Tile wurde entfernt

			//Aktualisiere Toolbar-Anzahl
			var tiletype = event.tile.type;
			if(level.tools[tiletype.name] >= 0) level.tools[tiletype.name] += 1;
			updateToolNumber(tiletype);
			
			/* 'Löschen' des Tiles:
			 * Das Tile wird nicht wirklich gelöscht, da, grafisch gesehen, auch ein leeres Feld eine Repräsentation benötigt.
			 * Daher wird das Feld lediglich zurückgesetzt und alle listener/handler entfernt.
			 */
			updateTileView(event.tile.x, event.tile.y);
			
		} else if (event.type === EVENT_TYPE_SWAPPED) { //Zwei Tiles wurden vertauscht
			var element1 = $(".x" + event.tile.x1 + ".y" + event.tile.y1);
			var element2 = $(".x" + event.tile.x2 + ".y" + event.tile.y2);
			
			//Wenn mit einem leeren Feld getauscht wurde, müssen diesem die Listener hinzugefügt werden. (Gelöscht werden sie automatisch)
			if (level.isEmpty(event.tile.x1, event.tile.y1)) initializeTileViewHandlers(event.tile.x2, event.tile.y2);
			if (level.isEmpty(event.tile.x2, event.tile.y2)) initializeTileViewHandlers(event.tile.x1, event.tile.y1);
			
			//Aktualisiere die Anzeige
			updateTileView(event.tile.x1, event.tile.y1);
			updateTileView(event.tile.x2, event.tile.y2);
			
		} else if (event.type === EVENT_TYPE_DESTINATION_REACHED){
			if (this.destinationsCount <= this.destinationsReached) {
				this.fireEvent(new Event(EVENT_TYPE_TEST_COMPLETED));
			}
		}
	});
	
	// Initialisiere das Spielfeld
	for(var y = 0; y < level.height; y++) {
		for(var x = 0; x < level.width; x++) {
			var tileview = $(document.createElement('div'))
				.addClass('tile')
				.addClass('x' + x)
				.addClass('y' + y)
				.css('width', parseInt($('#field').css('width'))/level.width)
				.css('height', parseInt($('#field').css('height'))/level.height)
				.appendTo('#field');
			if(level.getTile(x, y) != '__hydrate_undef' && level.getTile(x, y) != null) { 
				tileview.css('background-image', 
						'url(../images/' + level.getTile(x, y).type.name
							+ ((level.getTile(x, y).type.name === TILE_NAME_SOURCE || level.getTile(x, y).type.name === TILE_NAME_DESTINATION)
								? "_" + level.getTile(x, y).elements[level.getTile(x, y).getExits()[0]] : "") + '.png)');
				var rot = 90 * parseInt(level.getTile(x, y).rotation);
				tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
				tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
				tileview.css('transform', 'rotate(' + rot + 'deg)');
				tileview.addClass('immovable');
			} else {
				tileview
				.css('background-image', 'url(../images/empty.png)')
				.droppable({
					accept: ".tool, .tile",
					activeClass: "drop-highlight",
					hoverClass: "drop-hover-highlight",
					over: function ( event, ui ) {
						ui.helper.addClass("drag-hover-highlight");
					},
					out: function ( event, ui ) {
						ui.helper.removeClass("drag-hover-highlight");
					},
					drop: function (event, ui) {
						ui.helper.removeClass("drag-hover-highlight");
						var classes = $(this).attr('class').split(" ");
						var x = parseInt(classes[1].replace("x", ""));
						var y = parseInt(classes[2].replace("y", ""));
						if (ui.draggable.hasClass('tool')) {
							var tilename = ui.draggable.attr("id");
							var tiletype = TileType.byName(tilename);
							level.put(x, y, 0, new Tile(tiletype, TILE_ELEMENT_NONE, true), true);
							ui.helper.hide();
						} else if(ui.draggable.hasClass('tile')) {
							var sourceClasses = $(ui.draggable).attr('class').split(" ");
							var x2 = parseInt(sourceClasses[1].replace("x", ""));
							var y2 = parseInt(sourceClasses[2].replace("y", ""));
							level.swap(x2, y2, x, y);
						}
					}
				});
			}
		}
	}
	
	//Initialisiere Toolbox
	PLACEABLE_TILE_TYPES.forEach(function(tiletype, index) {
		
		//Füge das neue Element hinzu
		var tool = $(document.createElement('div'))
		.addClass("tool")
		.attr("id", tiletype.name)
		.appendTo("#toolbox");
		
		//Passe die Anzeige an je nachdem, ob oder wie oft der Tiletype in diesem Level verfügbar ist.
		if (tiletype.name in level.tools) {
			tool
			.css('background-image', 'url(../images/' + tiletype.name + '.png)')
			.addClass('interactable')
			.draggable({
				helper: "clone",
				revert: true,
				scroll: false,
				start: function (event, ui) {
					ui.helper.addClass("drag-highlight");
				},
				stop: function (event, ui) {
					ui.helper.removeClass("drag-highlight");
				},
				//snap: ".tile"
			});
		} else {
			tool
			.css('background-image', 'url(../images/lock.png)')
			.addClass("non-interactable");
		}
		
		//Anzahlanzeige
		var toolCount = $(document.createElement('div'))
		.addClass("toolnumber")
		.addClass("unselectable")
		.attr("id", "toolcount-" + tiletype.name)
		.appendTo("#toolbox");
		updateToolNumber(tiletype);
	});
	
	//Tooloverlay zum entfernen von Tiles
	$('#tboverlay').droppable({
		accept: '.tile',
		activeClass: "drop-highlight",
		hoverClass: "drop-hover-highlight",
		over: function ( event, ui ) {
			ui.helper.addClass("drag-hover-highlight");
		},
		out: function ( event, ui ) {
			ui.helper.removeClass("drag-hover-highlight");
		},
		activate: function(event, ui) {
			$('#tboverlay').css('z-index', '10');
		},
		deactivate: function(event, ui) {
			$('#tboverlay').css('z-index', '-10');
		},
		drop: function(event, ui) {
			ui.helper.removeClass("drag-hover-highlight");
			var classes = $(ui.draggable).attr('class').split(" ");
			var x = parseInt(classes[1].replace("x", ""));
			var y = parseInt(classes[2].replace("y", ""));
			level.remove(x, y);
		}
	});
	
	//Initialisiere Combulix
	
	combulix.initialize();
	combulix.speeches = [new Speech("Dummy")];
	//combulix.slideIn();
	
	$('#flow').click(function() {
		level.startRun();
		
	});
	
	//Initialisiere Menüelemente
	
	optionsMenu.initialize("10px", "calc(90% - 74px)").showButton();
	backButton.initialize("10px", "calc(100% - 74px)", showStageSelection).setVisible(true);
	
	//Starte Spielmusik
	
	var gameMusic = new Audio("../audio/Groovy-funky-music-clip.mp3");
	//gameMusic.play();
	
});