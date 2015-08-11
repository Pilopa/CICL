$(function() {
	
	//Globale Variablen
	var x = location.search.replace('?','').split('-');
	var levelid = x[0];
	var stageid = x[1];
	var level = getStages()[stageid].levels[levelid];
	var playerObject = getCurrentPlayerObject();
	
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
	
	function registerTileViewDroppable(selector) {
		$(selector).droppable({
			accept: ".tool, .tile",
			hoverClass: "drop-hover-highlight",
			deactivate: function (event, ui) {
				$(this).removeClass("drop-highlight");
			},
			activate: function (event, ui) {
				$(this).addClass("drop-highlight");
			},
			over: function ( event, ui ) {
				ui.helper.addClass("drag-hover-highlight");
				$(this).removeClass("drop-highlight");
			},
			out: function ( event, ui ) {
				ui.helper.removeClass("drag-hover-highlight");
				$(this).addClass("drop-highlight");
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
	
	function updateTileView(x, y, initializeHandlers) {
		if (x === undefined) console.log("error in updateTileView in levelview.fs: x is undefined");
		if (y === undefined) console.log("error in updateTileView in levelview.fs: y is undefined");
		var tile = level.getTile(x, y);
		var tileview = $(".x" + x + ".y" + y);
		if (tile !== null && tile !== undefined && tile !== "__hydrate_undef") {
			if (tile.type === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile.type is undefined: " + tile);
			if (tile === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile is undefined: " + tile);
			tileview.css('background-image', 
					'url(../images/' + level.getTile(x, y).type.name
						+ ((level.getTile(x, y).type.name === TILE_NAME_SOURCE || level.getTile(x, y).type.name === TILE_NAME_DESTINATION)
							? "_" + level.getTile(x, y).elements[level.getTile(x, y).getExits()[0]] : "") + '.png)');
			var rot = 90 * parseInt(tile.rotation);
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-moz-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-o-transform', 'rotate(' + rot + 'deg)');
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			/*if (!tile.moveable) tileview.addClass('immovable'); //TODO!
			else tileview.removeClass('immovable');*/
			if (initializeHandlers) initializeTileViewHandlers(x, y);
		} else {
			tileview
			.css('background-image', 'url(../images/empty.png)')
			.removeClass("interactable")
			.unbind();
			
			if (tileview.data('uiDraggable')) tileview.draggable('destroy');
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
	
	function updateToolView(tiletype) {
		var tool = $("#" + tiletype.name);
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
	}
	
	function updateToolBox() {
		PLACEABLE_TILE_TYPES.forEach(function(tiletype, index) {
			updateToolView(tiletype);
			updateToolNumber(tiletype);
		});
	}
	
	function initializeToolBox() {
		PLACEABLE_TILE_TYPES.forEach(function(tiletype, index) {
			
			//Füge das neue Element hinzu
			var tool = $(document.createElement('div'))
			.addClass("tool")
			.attr("id", tiletype.name)
			.appendTo("#toolbox");
			
			//Passe die Anzeige an je nachdem, ob oder wie oft der Tiletype in diesem Level verfügbar ist.
			updateToolView(tiletype);
			
			//Anzahlanzeige
			var toolCount = $(document.createElement('div'))
			.addClass("toolnumber")
			.addClass("unselectable")
			.attr("id", "toolcount-" + tiletype.name)
			.appendTo("#toolbox");
			
			updateToolNumber(tiletype);
		});
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
				.css('width', Math.floor(parseInt($('#field').css('width'))/level.width))
				.css('height', Math.floor(parseInt($('#field').css('height'))/level.height))
				.appendTo('#field');
			if(level.getTile(x, y) != '__hydrate_undef' && level.getTile(x, y) != null) { 
				tileview.addClass('immovable');
				updateTileView(x, y);
			} else {
				tileview
				.css('background-image', 'url(../images/empty.png)');
				registerTileViewDroppable(".tile.x" + x + ".y" + y);
			}
		}
	}
	
	//Initialisiere Toolbox
	initializeToolBox();
	
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
	
	if (playerObject.showLevelSelectionTutorial) {
		playerObject.showLevelSelectionTutorial = false;
		saveCurrentPlayerObject(playerObject);
	}
	
	combulix.initialize();
	if (playerObject.showGameTutorial) {
		var cornerPlaceHandler = function (event) {
			if (event.type === EVENT_TYPE_PLACED) {
				if (event.tile.x == 0 && event.tile.y == 1) {
					combulix.next();
				} else {
					level.remove(event.tile.x, event.tile.y);
				}
			}
		};
		combulix.speeches = [new Speech("Hey, du bist ja auch schon da! <br><br>Deine erste Herausforderung wartet schon auf dich ...", undefined, function () {
					       	 	$(".speech-bubble").addClass("highlighted");
					         }, function () {
					       	 	$(".speech-bubble").removeClass("highlighted");
					         }),
					         
					         new Speech("Das hier ist das Spielfeld. Es besteht aus mehreren Kacheln, welche wie bei einem Schachbrett angeordnet sind ...", undefined, function () {
						       	$("#field").addClass("highlighted");
						     }, function () {
						       	$("#field").removeClass("highlighted");
						     }),
						     
					         new Speech("Auf diesem Spielfeld sind Quellen und Ziele platziert. <br><br>Um das Spiel zu gewinnen, muss jede Quelle zu einem passenden Ziel führen.", undefined, function () {
					     		level.put(0, 0, 1, new Tile(TILE_TYPE_SOURCE, TILE_ELEMENT_LAVA));
					    		level.put(1, 4, 1, new Tile(TILE_TYPE_DESTINATION, TILE_ELEMENT_LAVA));
					    		updateTileView(0, 0);
					    		updateTileView(1, 4);
						       	$(".tile.x0.y0").addClass("highlighted").css("z-index", 21).removeClass('immovable').droppable('destroy');
						       	$(".tile.x1.y4").addClass("highlighted").css("z-index", 21).removeClass('immovable').droppable('destroy');
						     }, function () {
						       	$(".tile.x0.y0").removeClass("highlighted").css("z-index", 20);
						       	$(".tile.x1.y4").removeClass("highlighted").css("z-index", 20);
						     }),
						     
					         new Speech("Links siehst du den Werkzeugkasten. In diesem findest du die Werkzeuge mit denen du das Puzzel lösen kannst...", undefined, function () {
						       	$("#toolbox").addClass("highlighted");
						     }, function () {
						       	$("#toolbox").removeClass("highlighted");
						     }),
						     
							 new Speech("Zunächst arbeiten wir nur mit simplen Mitteln. Um genau zu sein: Ecken. <br><br>Links neben den Werkzeugen steht ihre verfügbare Anzahl ...", undefined, function () {
					        	level.tools = {
					        		corner: 0
					        	}
					        	updateToolBox();
					        	$("#corner").addClass("highlighted").removeClass("immovable");
						     }, function () {
						        $("#corner").removeClass("highlighted");
						     }),
						     
						     new Speech("Ziehe zunächst eine Ecke von der Werkzeugleiste auf das makierte Feld ...", undefined, function () {
					        	 level.tools = {
						        	corner: 1
						         }
					        	 updateToolNumber(TILE_TYPE_CORNER);
						    	 level.registerListener(cornerPlaceHandler);
						    	 $("#corner").addClass("highlighted");
						    	 $(".tile.x0.y1").addClass("highlighted").css("z-index", 21);
						    	 combulix.disableNext();
						    	 //$(".tile:not(x0):not(y1)").droppable('destroy');
						     }, function () {
						    	 level.removeListener(cornerPlaceHandler);
						    	 $("#corner").removeClass("highlighted");
						    	 $(".tile.x0.y1").removeClass("highlighted").css("z-index", 20);
						    	 combulix.enableNext();
						     }),
						     
						     new Speech("Ziehe zunächst eine Ecke von der Werkzeugleiste auf das makierte Feld ...", undefined, function () {
						    	 combulix.disableNext();
						     }, function () {
						    	 level.removeListener(cornerPlaceHandler);
						    	 $("#corner").removeClass("highlighted");
						    	 $(".tile.x0.y1").removeClass("highlighted").css("z-index", 20);
						    	 combulix.enableNext();
						     }),
						     
						     new Speech("Und jetzt mache ich dir Platz. Klicke einfach weiter oder wische nach Links, um mich auszublenden." +
						     		"<br><br>Du kannst mich jederzeit mit einem Klick auf den grünen Pfeil zurückholen.")];
		combulix.slideIn();
	} else {
		combulix.speeches = [new Speech("Ich weiß doch auch nicht weiter . . .")];
		level.put(0, 1, 0, new Tile(TILE_TYPE_SOURCE, TILE_ELEMENT_LAVA), true);
		level.put(3, 2, 0, new Tile(TILE_TYPE_DESTINATION, TILE_ELEMENT_LAVA), true);
		combulix.slideOut();
	}
	
	$('#startbutton').click(function() {
		level.startRun();
		
	});
	
	//Initialisiere Menüelemente
	
	optionsMenu.initialize("7px", "calc(90% - 74px)").showButton();
	backButton.initialize("7px", "calc(100% - 74px)", showStageSelection).setVisible(true);
	
	//Starte Spielmusik
	
	var gameMusic = new Audio("../audio/Groovy-funky-music-clip.mp3");
	//gameMusic.play();
	
});