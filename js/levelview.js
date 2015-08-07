$(function() {
	
	//Globale Variablen
	var x = location.search.replace('?','').split('-');
	var levelid = x[0];
	var stageid = x[1];
	var level = getStages()[stageid].levels[levelid];
	
	//Funktionen
	function initializeTileView(x, y) {
		var tileview = $(".x" + x + ".y" + y);
		tileview.draggable({
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
			if (level.playfield[x][y] !== null && level.playfield[x][y] !== undefined && level.playfield[x][y].movable) level.rotate(x, y);
			else console.log("click but no rotate on [" + x + "|" + y + "]")
		})
		.addClass('interactable');
		return tileview;
	}
	
	function updateTileView(x, y, initializeHandlers) {
		if (x === undefined) console.log("error in updateTileView in levelview.fs: x is undefined");
		if (y === undefined) console.log("error in updateTileView in levelview.fs: y is undefined");
		var tile = level.playfield[x][y];
		var tileview = $(".x" + x + ".y" + y);
		if (tile !== null && tile !== undefined && tile !== "__hydrate_undef") {
			if (tile.type === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile.type is undefined: " + tile);
			if (tile === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile is undefined: " + tile);
			tileview.css('background-image', 'url(../images/' + tile.type.name + '.png)');
			var rot = 90 * parseInt(tile.rotation);
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
			if (initializeHandlers) initializeTileView(x, y);
		} else {
			tileview
			.css('background-image', 'url(../images/empty.png)')
			.removeClass("interactable")
			.unbind()
			.draggable('destroy');
		}
		return tileview;
	}
	
	//Handle Events
	level.registerListener(function (event) {
		console.log(event.toString()); //Debug
		
		//Ein Tile wurde platziert.
		if (event.type === EVENT_TYPE_PLACED) {
			if (event.tile.x === undefined) console.log("error in levelview.fs eventHandler: event.tile.x is undefined");
			if (event.tile.y === undefined) console.log("error in levelview.fs eventHandler: event.tile.y is undefined");
			updateTileView(event.tile.x, event.tile.y, true);
		} else if (event.type === EVENT_TYPE_ROTATED) { //Ein Tile wurde gedreht.
			updateTileView(event.tile.x, event.tile.y);
		} else if (event.type === EVENT_TYPE_REMOVED) { //Ein Tile wurde entfernt

			//Aktualisiere Toolbar-Anzahl
			/*
			var toolid = parseInt(tileview.attr("id").replace("tool", ""));
			if(level.tools[toolid] == 0) {
				$('#tool' + toolid).removeClass('tilena');
				$('#tt' + toolid).removeClass('tilenatext');
				$('#tool' + toolid).draggable("enable");
			}
			if(level.tools[toolid] >= 0) {
				level.tools[toolid] += 1;
			}*/
			
			/* 'Löschen' des Tiles:
			 * Das Tile wird nicht wirklich gelöscht, da, grafisch gesehen, auch ein leeres Feld eine Repräsentation benötigt.
			 * Daher wird das Feld lediglich zurückgesetzt und alle listener/handler entfernt.
			 */
			updateTileView(event.tile.x, event.tile.y);
			
		} else if (event.type === EVENT_TYPE_SWAPPED) { //Zwei Tiles wurden vertauscht
			var element1 = $(".x" + event.tile.x1 + ".y" + event.tile.y1);
			var element2 = $(".x" + event.tile.x2 + ".y" + event.tile.y2);
			
			//Wenn mit einem leeren Feld getauscht wurde, müssen diesem die Listener hinzugefügt werden
			if (level.playfield[event.tile.x1][event.tile.y1] === null || level.playfield[event.tile.x1][event.tile.y1] === undefined || level.playfield[event.tile.x1][event.tile.y1] === "__hydrate_undef") initializeTileView(event.tile.x2, event.tile.y2);
			if (level.playfield[event.tile.x2][event.tile.y2] === null || level.playfield[event.tile.x2][event.tile.y2] === undefined || level.playfield[event.tile.x2][event.tile.y2] === "__hydrate_undef") initializeTileView(event.tile.x1, event.tile.y1);
			
			//Aktualisiere die Anzeige
			updateTileView(event.tile.x1, event.tile.y1);
			updateTileView(event.tile.x2, event.tile.y2);
			
		}
	});
	
	// Initialisiere das Spielfeld
	for(var i = 0; i < level.height; i++) {
		for(var j = 0; j < level.width; j++) {
			var tileview = $(document.createElement('div'))
				.addClass('tile')
				.addClass('x' + i)
				.addClass('y' + j)
				.css('width', parseInt($('#field').css('width'))/level.width)
				.css('height', parseInt($('#field').css('height'))/level.height)
				.appendTo('#field');
			if(level.playfield[i][j] != '__hydrate_undef' && level.playfield[i][j] != null) { 
				tileview.css('background-image', 'url(../images/' + level.playfield[i][j].type.name + '.png)');
				var rot = 90 * parseInt(level.playfield[i][j].rotation);
				tileview.css('transform', 'rotate(' + rot + 'deg)');
				tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
				tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
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
							/*
							if(level.tools[tilename] > 0) {
								var newamount = level.tools[tilename] -1;
								level.tools[tilename] = newamount;
								$('#tt' + toolid).text(newamount);
							}
							if(level.tools[tilename] == 0) {
								$('#tool' + toolid).addClass('tilena');
								$('#tt' + toolid).addClass('tilenatext');
								$('#tool' + toolid).draggable("disable");
							}*/
							$(this).addClass('interactable');
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
			.css("cursor", "not-allowed");
		}
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
	
	/*
	for(var i = 0; i < level.tools.length; i++) {
		if(level.tools[i] == -2) {
			$('#tname'+i).text('');
			$('#tool'+i).css('background-image', 'url(../images/lock.png)').css("cursor", "not-allowed");
		} else if(level.tools[i] == -1) {
			$('#tt'+i).text('∞').css("font-size", "16pt");
		} else {
			$('#tt'+i).text(level.tools[i]);
		}
		//Generelle Einstellungen, Drag & Drop
		if (level.tools[i] != -2) {
			$("#tool" + i).css("cursor", "pointer");
			$("#tool" + i)
		}
		$("#tt" + i).addClass("unselectable").addClass("toolnumber");
		$("#tname" + i).addClass("unselectable").addClass("tooltext");
		if(level.tools[i] == 0) {
			$('#tool' + i).addClass('tilena');
			$('#tt' + i).addClass('tilenatext');
			$('#tool' + i).draggable("disable");
		}
		

	}*/
	
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
	
	
});