$(function() {
	//fülle Spielfeld
	var x = location.search.replace('?','').split('-');
	var levelid = x[0];
	var stageid = x[1];
	var level = getStages()[stageid].levels[levelid];
	level.registerListener(function (event) {
		//Sammle Daten über das Tile, auf welchem das Event stattgefunden hat.
		if (event.tile !== undefined) {
			var x = event.tile.x;
			var y = event.tile.y;
			var tileview = $(".x" + x + ".y" + y);
		}
		//Ein Tile wurde platziert.
		if (event.type === EVENT_TYPE_PLACED) {
			tileview.css('background-image', 'url(../images/' + level.playfield[x][y].type.name + '.png)');
			var rot = 90 * parseInt(level.playfield[x][y].rotation);
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
		} else if (event.type === EVENT_TYPE_ROTATED) { //Ein Tile wurde gedreht.
			var rot = 90 * parseInt(level.playfield[x][y].rotation);
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
		}
		console.log(event.toString()); //Debug
	});
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
				.click(function (event) { //Der Spieler klickt auf ein Tile, um es zu drehen.
					var classes = $(this).attr('class').split(" ");
					var x = parseInt(classes[1].replace("x", ""));
					var y = parseInt(classes[2].replace("y", ""));
					if (level.playfield[x][y] !== undefined && level.playfield[x][y].movable) level.rotate(x, y);
					else console.log("click but no rotate on [" + x + "|" + y + "]")
				})
				.droppable({
					accept: ".tool, .tile",
					activeClass: "tile-drag-highlight",
					hoverClass: "tile-hover-highlight",
					over: function ( event, ui ) {
						ui.helper.addClass("tool-drag-hover-highlight");
					},
					out: function ( event, ui ) {
						ui.helper.removeClass("tool-drag-hover-highlight");
					},
					drop: function (event, ui) {
						var classes = $(this).attr('class').split(" ");
						var x = parseInt(classes[1].replace("x", ""));
						var y = parseInt(classes[2].replace("y", ""));
						var toolid = parseInt(ui.draggable.attr("id").replace("tool", ""));
						switch (toolid) {
						case 0:
							level.put(x, y, 0, new Tile(TILE_TYPE_STRAIGHT, TILE_ELEMENT_NONE, true), true);
							break;
						case 1:
							level.put(x, y, 0, new Tile(TILE_TYPE_CORNER, TILE_ELEMENT_NONE, true), true);
							break;
						case 2:
							level.put(x, y, 0, new Tile(TILE_TYPE_CROSSROADS, TILE_ELEMENT_NONE, true), true);
							break;
						case 3:
							level.put(x, y, 0, new Tile(TILE_TYPE_TJUNCTION, TILE_ELEMENT_NONE, true), true);
							break;
						}
						ui.helper.hide();
						if(level.tools[toolid] > 0) {
							var newamount = level.tools[toolid] -1;
							level.tools[toolid] = newamount;
							$('#tt' + toolid).text(newamount);
						}
						if(level.tools[toolid] == 0) {
							$('#tool' + toolid).addClass('tilena');
							$('#tt' + toolid).addClass('tilenatext');
							$('#tool' + toolid).draggable("disable");
						}
						$(this).addClass('interactable');
						$(this).draggable({
							revert: true,
							scroll: false,
							start: function (event, ui) {
								ui.helper.addClass("tool-drag-highlight");
							},
							stop: function (event, ui) {
								ui.helper.removeClass("tool-drag-highlight");
								//Zurückdrehen
								//Altes Tile im Level löschen
								//Neues Tile ins Level schreiben
								
							},
						});
					}
				});
			}
		}
	}
	//fülle Toolbox
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
			$("#tool" + i).draggable({
				helper: "clone",
				revert: true,
				scroll: false,
				start: function (event, ui) {
					ui.helper.addClass("tool-drag-highlight");
				},
				stop: function (event, ui) {
					ui.helper.removeClass("tool-drag-highlight");
				},
				//snap: ".tile"
			});
		}
		$("#tt" + i).addClass("unselectable").addClass("toolnumber");
		$("#tname" + i).addClass("unselectable").addClass("tooltext");
		if(level.tools[i] == 0) {
			$('#tool' + i).addClass('tilena');
			$('#tt' + i).addClass('tilenatext');
			$('#tool' + i).draggable("disable");
		}
		$('#tboverlay').droppable({
			accept: '.tile',
			activate: function(event, ui) {
				$('#tboverlay').css('z-index', '10');
			},
			deactivate: function(event, ui) {
				$('#tboverlay').css('z-index', '-10');
			},
			drop: function(event, ui) {
				var toolid = parseInt(ui.draggable.attr("id").replace("tool", ""));
				if(level.tools[toolid] == 0) {
					$('#tool' + toolid).removeClass('tilena');
					$('#tt' + toolid).removeClass('tilenatext');
					$('#tool' + toolid).draggable("enable");
				}
				if(level.tools[toolid] >= 0) {
					level.tools[toolid] += 1;
				}
			}
		});
	}
	
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