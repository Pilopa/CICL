/**
 * Ermöglichst das Spielen des Spiels.
 * Interagiert mit dem Datenmodell ('level.js') und zeigt es dynamisch an.
 * Beim ersten Spielen wird ein Tutorial angezeigt.
 *
 * @requires 'jquery-1.11.2.min.js'
 * @requires 'jquery.animate-shadow-min.js'
 * @requires 'jquery.mobile-1.4.5.min.js'
 * @requires 'jquery-ui.min.js'
 * @requires 'jquery.ui.touch-punch.min.js'
 * @requires 'resurrect.js'
 * @requires 'main.js'
 * @requires 'audio.js'
 * @requires 'stages.js'
 * @requires 'walker.js'
 * @requires 'menues.js'
 * @requires 'router.js'
 * @requires 'combulix.js'
 * @see levelview.html
 * @see levelview.css
 */

$(function() {
	
	//Globale Variablen
	var x = location.search.replace('?','').split('-');
	var stageid = parseInt(x[0]);
	var levelid = parseInt(x[1]);
	var stage = getStages()[stageid];
	var level = stage.levels[levelid];
	var playerObject = getCurrentPlayerObject();
	var maxPointValue = level.getMaxPointValue(); //Muss nur einmal berechnet werden.
	$.event.special.swipe.horizontalDistanceThreshold = 150; //px //Definiere die Grenze, ab welchem ein Swipe-Event ausgelöst wird.
	
	//Funktionen
	
	/**
	 * Wird benötigt, um das Score-Objekt am Ende des Spiels zu generieren.
	 * 
	 * @returns die Anzahl der Sterne anhand der errechneten Punktzahl.
	 */
	function getStarsFromPoints() {
		var pointRange = maxPointValue - level.optimalPointValue;
		var step = pointRange/level.starDivisor;
		var excess = level.optimalPointValue - maxPointValue + level.getPlacedPointValue();
		if(excess <= 0) return 5;
		else {
			var starsmissed = Math.ceil(excess/step);
			if(starsmissed > 9) starsmissed = 9; // Eine Bewertung unter 0,5 ist nicht möglich wenn man ein Level abschließt
			return (10-starsmissed)/2; 
		}
	}
	
	/**
	 * Wird beim erfolgreichen Beenden des Levels durch den Post-Game-Screen aufgerufen.
	 * 
	 * @returns Ein Objekt, welches die Bewertungen für den Spieler enthält.
	 */
	function getScoreObject() {
		
		return {
			previousScore: playerObject.scores[stageid][levelid],
			newScore: getStarsFromPoints()
		};
		
	}
	
	/**
	 * Zeigt eine Tabelle zu den Wertigkeiten der einzelnen Werkzeuge an.
	 *
	 * @deprecated Derzeit nicht implementiert!
	 * @param {event} Das ausgelöste Event.
	 */
	function pointValueClickHandler(event) {
		//TODO: Anzeige der Wertigkeiten von Werkzeugen
	}
	
	/**
	 * Aktualisiert die Punkteanzeige anhand des bestehenden Datenmodells.
	 */
	function updateLevelPointValueDisplay() {
		var value = maxPointValue - level.getPlacedPointValue();
		$("#pointlValueDisplay").text(value > 0 ? value : "0");
	}
	
	/**
	 * Aktualisiert den Status der Schaltfläche unten in der Mitte des Spielfelds.
	 *
	 * @param {bool} flag Ob der Button aktiv sein soll.
	 * @param {string} text Der neue Text der Schaltfläche.
	 */
	function setStartButtonEnabled(flag, text) {
		if (flag) {
			$("#startbutton").addClass("interactable");
		} else {
			$("#startbutton").removeClass("interactable");
		}
		document.getElementById("startbutton").disabled = !flag;
		if (typeof text !== 'undefined') $("#startbutton").text(text)
	}
	
	/**
	 * Was passiert, wenn ein Tile gedreht wird (Linksklick) ?
	 * 
	 * @param {event} event Das ausgelöste JQuery-Event
	 */
	function rotateEventHandler(event) {
		var classes = $(this).attr('class').split(" ");
		var x = parseInt(classes[1].replace("x", ""));
		var y = parseInt(classes[2].replace("y", ""));
		if (level.getTile(x, y) !== null && level.getTile(x, y) !== undefined && level.getTile(x, y).rotatable) level.rotate(x, y);
		else console.log("click but no rotate on [" + x + "|" + y + "]");
	}
	
	/**
	 * Initialisiert Handler auf einem Tile, sodass es gedreht werden kann.
	 * 
	 * @param {number} x Die x-Koordinate (view).
	 * @param {number} y Die y-Koordinate (view).
	 */
	function initializeTileViewRotateHandler(x, y) {
		if (!$(".x" + x + ".y" + y).is(".rotatable")) {
			$(".x" + x + ".y" + y).on("click", rotateEventHandler);
			$(".x" + x + ".y" + y).addClass("rotatable");
		}
	}
	
	/**
	 * Initialisiert Handler auf einem Tile, sodass es bewegt/gelöscht werden kann.
	 * 
	 * @param {number} x Die x-Koordinate (view).
	 * @param {number} y Die y-Koordinate (view).
	 */
	function initializeTileViewDragHandler(x, y) {
		if (!$(".x" + x + ".y" + y).is(':data(ui-draggable)'))
			$(".x" + x + ".y" + y).draggable({
				scroll: false,
				delay: 120,
				revert: function (droppable) {
					
					if (!droppable) $(this).draggable("option", "revertDuration", 500);
					else if ($(this).is(":data(ui-draggable)")) $(this).draggable("option", "revertDuration", 0);
					else  $(this).removeClass("ui-draggable-dragging");
					
					return true;
					
					
				},
				stop: function (event, ui) {
					//Manchmal werden die top-und left-werte nach dem Drag & Drop nicht automatisch korrekt zurückgesetzt. 
					//Daher wird das hier manuell getan.
					$(this)
					.css("top", "")
					.css("left", "");
				}
		});
	}
	
	/**
	 * Ermöglicht es, dass ein anderes Tile mit diesem seinen Platz tauschen kann
	 * UND dass der Spieler Tools aus der Werkzeugleiste auf diesem Tile platzieren kann.
	 * 
	 * @param {jquery-selector} jquery Das JQuery-Objekt, dem der Handler hinzugefügt werden soll.
	 */
	function initializeTileViewDropHandler(jquery) {
		if (!$(jquery).is('.ui-droppable')) $(jquery).droppable({
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
					level.put(x, y, 0, new Tile(tiletype, TILE_ELEMENT['none'], true, true), true);
					ui.helper.remove();
				} else if(ui.draggable.hasClass('tile')) {
					var sourceClasses = $(ui.draggable).attr('class').split(" ");
					var x2 = parseInt(sourceClasses[1].replace("x", ""));
					var y2 = parseInt(sourceClasses[2].replace("y", ""));
					level.swap(x2, y2, x, y);
				}
			
			}
		});
	}
	
	/**
	 * Überprüft, welche Interaktionen das angegebene Tile zulässt und aktualisiert die Handler entsprechend.
	 * 
	 * @param {number} x Die x-Koordinate des Tiles (view & model).
	 * @param {number} y Die y-Koordinate des Tiles (view & model).
	 *
	 * @return Die grafische Repräsentation des Tiles.
	 */
	function updateTileViewHandlers(x, y) {
		var tileview = $(".x" + x + ".y" + y);
		
		if (!level.isEmpty(x, y)) {
			
			//Ist das Tile beweglich ?
			
			if (level.getTile(x, y).movable === true) {
				
				initializeTileViewDragHandler(x, y);
				initializeTileViewDropHandler(".x" + x + ".y" + y);
				
			} else {
				
				if ($(tileview).is(":data(ui-draggable)")) $(tileview).draggable('destroy');
				if ($(tileview).is(":data(ui-droppable)")) $(tileview).droppable('destroy');
				
			}
			
			//Ist das Tile drehbar ?
			
			if (level.getTile(x, y).rotatable === true) {
				
				initializeTileViewRotateHandler(x, y);
				
			} else {
				
				tileview.off("click", rotateEventHandler);
				tileview.removeClass("rotatable");
				
			}
			
		} else {
			
			//Dieser Teil passiert, wenn das Tile auf diesem Feld leer ist.
			initializeTileViewDropHandler(tileview);
			if ($(tileview).is(":data(ui-draggable)")) $(tileview).draggable('destroy');
			tileview.off("click", rotateEventHandler);
			tileview.removeClass("rotatable");
			
		}
		
		return tileview;
	}
	
	/**
	 * Bestimmt die Änderungen an dem Datenmodell eines Tiles und aktualisiert dessen Anzeige entsprechend.
	 * 
	 * @param {number} x Die x-Koordinate des Tiles (view & model).
	 * @param {number} y Die y-Koordinate des Tiles (view & model).
	 *
	 * @return Die grafische Repräsentation des Tiles.
	 */
	function updateTileView(x, y) {
		if (x === undefined) console.log("error in updateTileView in levelview.fs: x is undefined");
		if (y === undefined) console.log("error in updateTileView in levelview.fs: y is undefined");
		var tile = level.getTile(x, y);
		var tileview = $(".x" + x + ".y" + y);
		
		if (tile !== null && tile !== undefined) {
			if (tile.type === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile.type is undefined: " + tile);
			if (tile === undefined) console.log("error in updateTileView in levelview.fs eventHandler: tile is undefined: " + tile);
			tileview.css('background-image', 
					'url(../images/' + level.getTile(x, y).type.name
						+ ((level.getTile(x, y).type.name === TILE_NAME['source'] || level.getTile(x, y).type.name === TILE_NAME['destination'])
							? "_" + level.getTile(x, y).elements[level.getTile(x, y).getExits()[0]] : "") + '.png)');
			var rot = 90 * parseInt(tile.rotation);
			tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-moz-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
			tileview.css('-o-transform', 'rotate(' + rot + 'deg)');
			tileview.css('transform', 'rotate(' + rot + 'deg)');
			if (!level.isEmpty(x,y) && (level.getTile(x, y).movable || level.getTile(x, y).rotatable)) {
				tileview.addClass('interactable');
				tileview.removeClass('immovable');
			} else {
				tileview.addClass('immovable');
				tileview.removeClass('interactable');
			}
		} else {
			tileview
			.css('background-image', 'url(../images/empty.png)')
			.css("transform", "")
			.css("top", "")
			.css("left", "")
			.removeClass("interactable");
		}
		
		updateTileViewHandlers(x, y);
		return tileview;
	}
	
	/**
	 * Aktualisiert die Anzahl-Anzeige für ein Werkzeug innerhalb des Werkzeugkastens.
	 *
	 * @param {TileType} tiletype Der zu aktualisierende TileType (z.b. TILE_TYPE.straight).
	 * @return {JQuery-Object} Die grafische Repräsentation der Anzahlanzeige. 
	 */
	function updateToolNumber(tiletype) {
		var toolNumberView = $('#toolcount-' + tiletype.name);
		toolNumberView.text((level.tools[tiletype.name] === undefined) ? ""
				:  ((level.tools[tiletype.name] === -1) ? "∞" : level.tools[tiletype.name] + "x")); //((level.tools[tiletype.name] === 0) ? "-" : //Falls bei genau 0 Tools ein anderer Text angezeigt werden sollte.
		if (level.tools[tiletype.name] > 0) {
			$("#" + tiletype.name)
			.draggable("enable")
			.addClass("interactable")
			.removeClass("non-interactable")
			.removeClass("tool-disabled");
			
			toolNumberView.removeClass("tool-number-disabled");
		} else if (level.tools[tiletype.name] == 0) {
			$("#" + tiletype.name)
			.draggable("disable")
			.removeClass("interactable")
			.addClass("non-interactable")
			.addClass("tool-disabled");
			
			toolNumberView.addClass("tool-number-disabled");
		}
		return toolNumberView;
	}
	
	/**
	 * Aktualisiert die Anzeige eines Werkzeuges anhand des dem Level zugrundeliegenden Datenmodell.
	 *
	 * @param {TileType} tiletype Der TileType des zu aktualisierenden Werkzeuges.
	 */
	function updateToolView(tiletype) {
		var tool = $("#" + tiletype.name);
		if (tiletype.name in level.tools) {
			tool
			.css('background-image', 'url(../images/' + tiletype.name + '.png)')
			.addClass('interactable');
			if (!tool.is(":data(ui-draggable)")) tool.draggable({
								helper: "clone",
								revert: true,
								scroll: false,
								cursorAt: {
								    left: Math.floor(tilesize / 2),
								    top: Math.floor(tilesize / 2)
								},
								start: function (event, ui) {
									ui.helper
									.css("width", tilesize)
									.css("height", tilesize);
								}
								
							});
		} else {
			tool
			.css('background-image', 'url(../images/lock.png)')
			.addClass("non-interactable");
		}
	}
	
	/**
	 * Aktualisiert die Werkzeugleiste.
	 */
	function updateToolBox() {
		PLACEABLE_TILE_TYPES.forEach(function(tiletype, index) {
			updateToolView(tiletype);
			updateToolNumber(tiletype);
		});
	}
	
	/**
	 * Initialisiert die Werkzeugleiste anhand der im Datenmodell des Levels, sowie den als global verfügbar
	 * definierten verfügbaren Werkzeuge.
	 */
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
			.addClass("centered-text")
			.attr("id", "toolcount-" + tiletype.name)
			.appendTo("#toolbox");
			
			updateToolNumber(tiletype);
		});
	}
	
	/**
	 * Nach dem Starten eines Tests kann dieser mit Hilfe von 'clearRun' zurückgesetzt werden.
	 */
	function clearRun() {
		$('.flow').remove();
		level.clearElements();
		level.destinationsReached = 0;
	}
	
	/**
	 * Spielt den Sound ab, welcher das Platzieren eines Tiles repräsentiert.
	 */
	function playDragdropSound() {
		audio.playSound("dragdropSound");
	}
	
	//Eventhandler initialisieren
	level.registerListener(function (event) {
		
		//console.log(event.toString()); //Kann zu Testzwecken einkommentiert werden.
		
		if (event.type === EVENT_TYPE['placed']) { //Ein Tile wurde platziert.
			
			if (event.tile.x === undefined) console.log("error in levelview.fs eventHandler: event.tile.x is undefined");
			if (event.tile.y === undefined) console.log("error in levelview.fs eventHandler: event.tile.y is undefined");
			updateTileView(event.tile.x, event.tile.y);
			if(level.tools[event.tile.type.name] > 0) level.tools[event.tile.type.name] -= 1;
			updateToolNumber(event.tile.type);
			
			//Aktualisiere die Punkteanzeige
			updateLevelPointValueDisplay();
			
			//Abspielen des Sounds
			playDragdropSound();
			
		} else if (event.type === EVENT_TYPE['rotated']) { //Ein Tile wurde gedreht.
			
			updateTileView(event.tile.x, event.tile.y);
			
			//Abspielen des Sounds
			playDragdropSound();
			
		} else if (event.type === EVENT_TYPE['removed']) { //Ein Tile wurde entfernt

			//Aktualisiere Toolbar-Anzahl
			var tiletype = event.tile.type;
			if(level.tools[tiletype.name] >= 0) level.tools[tiletype.name] += 1;
			updateToolNumber(tiletype);
			
			/* 'Löschen' des Tiles:
			 * Das Tile wird nicht wirklich gelöscht, da, grafisch gesehen, auch ein leeres Feld eine Repräsentation benötigt.
			 * Daher wird das Feld lediglich zurückgesetzt und alle listener/handler entfernt.
			 */
			updateTileView(event.tile.x, event.tile.y);
			
			//Aktualisiere die Punkteanzeige
			updateLevelPointValueDisplay();
			
			//Abspielen des Sounds
			audio.playSound("removeSound");
			
		} else if (event.type === EVENT_TYPE['swapped']) { //Zwei Tiles wurden vertauscht
			
			//Aktualisiere die Anzeige
			updateTileView(event.tile.x1, event.tile.y1);
			updateTileView(event.tile.x2, event.tile.y2);
			
			//Abspielen des Sounds
			playDragdropSound();
			
		} else if (event.type === EVENT_TYPE['testcompleted']) { //Der Test wurde Erfolgreich beendet.
			// Walker-Prüftimer anhalten
			level.endRun();
			
			//Sound abspielen
			audio.playSound("tadaSound");
			
			//Die Punkte berechnen
			var scoreObject = getScoreObject();
			console.log(scoreObject);
			
			//Die Punkte vergeben
			if (playerObject.showGameTutorial) playerObject.showGameTutorial = false;
			if (playerObject.scores[stageid][levelid] === undefined || scoreObject.previousScore < scoreObject.newScore) playerObject.scores[stageid][levelid] = scoreObject.newScore;
			saveCurrentPlayerObject(playerObject);
			
			//Start-Button zurücksetzen (hihi)
			setStartButtonEnabled(true, "Weiterbasteln");
			
			//Sieges-Feedback
			$(".game").animate({
				boxShadow : "0 0 75px 0 rgba(0, 255, 0, 1) inset"
			}, 400, function () {
				$(this).animate({
					boxShadow : "0 0 5px 0 rgba(0, 255, 0, 1) inset"
				}, 1000, function () {
					$(this).addClass("right");
					
					//Punkteanzeige erstellen und anzeigen
					
					//Hauptcontainer
					$(document.createElement('div'))
					.addClass("screen-overlay")
					.attr("id", "score-display")
					.appendTo("#levelview");
					
					//Content-Container
					$(document.createElement('div'))
					.addClass("popup-content-container")
					.attr("id", "score-display-content")
					.appendTo("#score-display");
					
					//Glückwunsch-Text
					$(document.createElement('div'))
					.text("! Glückwunsch !")
					.addClass("centered-text")
					.attr("id", "congrats-text")
					.appendTo("#score-display-content");
					
					//Vorherige Wertung-Text
					$(document.createElement('div'))
					.text("Bisherige Wertung:")
					.addClass("centered-text")
					.addClass("rating-text")
					.attr("id", "previous-rating-text")
					.appendTo("#score-display-content");
					
					//Vorherige Wertung
					var ratingContainer = $(document.createElement('div'))
					.addClass("rating-container")
					.attr("id", "previous-rating-container")
					.appendTo("#score-display-content");
					
					//Vorherige Wertung anzeigen
					var floorScore =  Math.floor(scoreObject.previousScore);
					for (var n = 0; n < 5; n++) {
						var ratingDisplay = $(document.createElement('div'))
						.addClass("rating-display")
						.attr("id", "rating-" + n)
						.appendTo("#previous-rating-container");
						
						if (scoreObject.previousScore > n) {
							if (n === floorScore && scoreObject.previousScore !== parseInt(scoreObject.previousScore, 10)) {
								if (0.5 <= scoreObject.previousScore - floorScore) ratingDisplay.addClass("star-half");
							} else ratingDisplay.addClass("star-full");
						} else {
							ratingDisplay.addClass("star-empty");
						}
					}
					
					//Deine Wertung-Text
					$(document.createElement('div'))
					.text("Deine Wertung:")
					.addClass("centered-text")
					.addClass("rating-text")
					.attr("id", "your-rating-text")
					.appendTo("#score-display-content");
					
					//Deine Wertung
					var ratingContainer = $(document.createElement('div'))
					.addClass("rating-container")
					.attr("id", "your-rating-container")
					.appendTo("#score-display-content");
					
					//Deine Wertung anzeigen
					floorScore =  Math.floor(scoreObject.newScore);
					for (var n = 0; n < 5; n++) {
						var ratingDisplay = $(document.createElement('div'))
						.addClass("rating-display")
						.attr("id", "rating-" + n)
						.appendTo("#your-rating-container");
						
						if (scoreObject.newScore > n) {
							if (n === floorScore && scoreObject.newScore !== parseInt(scoreObject.newScore, 10)) {
								if (0.5 <= scoreObject.newScore - floorScore) ratingDisplay.addClass("star-half");
							} else ratingDisplay.addClass("star-full");
						} else {
							ratingDisplay.addClass("star-empty");
						}
					}
					
					//Schließen-Button
					$(document.createElement('div'))
					.addClass("close-button")
					.addClass("interactable")
					.attr("id", "score-display-close")
					.click(function () {
						$("#score-display").fadeOut(function() {
							$(this).remove();
						});
					})
					.appendTo("#score-display");
					
					//Weiter Button
					$(document.createElement('div'))
					.text("Weiterbasteln")
					.addClass("continue-button")
					.addClass("centered-text")
					.addClass("interactable")
					.attr("id", "score-display-continue")
					.click(function () {
						$("#score-display").fadeOut(function() {
							$(this).remove();
						});
					})
					.appendTo("#score-display-content");
					
					//Zur Levelauswahl-Button
					$(document.createElement('div'))
					.text("Zur Levelauswahl")
					.addClass("to-level-selection-button")
					.addClass("centered-text")
					.addClass("interactable")
					.attr("id", "score-display-to-level-selection")
					.click(function () {
						
						$("#score-display").fadeOut(function() {
							showLevelSelection(stageid);
						});
						
					})
					.appendTo("#score-display-content");
					
					if(getCurrentPlayerObject() !== null && getCurrentPlayerObject().playSound) {
						audio.soundOnClick(".to-level-selection-button");
						audio.soundOnClick(".continue-button");
					}
					
					$("#score-display").hide().fadeIn(800);
					
				});
			});
			
		} else if (event.type === EVENT_TYPE['testfailed']) { //Der Test ist fehlgeschlagen.
			// Walker anhalten
			level.endRun();
			
			// Sound abspielen
			audio.playSound("failSound");
			
			//Fail-Feedback
			$(".game").animate({
				boxShadow : "0 0 75px 0 rgba(255, 0, 0, 1) inset"
			}, 400, function () {
				$(this).animate({
					boxShadow : "0 0 5px 0 rgba(255, 0, 0, 1) inset"
				}, 1000,function () {
					$(this).addClass("wrong");
					//Button zurücksetzen
					setStartButtonEnabled(true, "Weiterbasteln");
				});
			});
			
		}
		
	});
	
	// Initialisiere das Spielfeld
	$('#levelheader').text((stage.title === undefined ? "Bereich " + (i + 1) : stage.title) + " : " + (level.title === undefined ? "Bereich " + (i + 1) : level.title));
	
	var tilesize = 0;
	if(level.width >= level.height) {
		tilesize = Math.floor(parseInt($('#space').css('width'))/level.width);
		$('#field').css('top', Math.floor((parseInt($('#space').css('height'))-(tilesize*level.height))/2));
	} else {
		tilesize = Math.floor(parseInt($('#space').css('height'))/level.height);
		$('#field').css('left', Math.floor((parseInt($('#space').css('width'))-(tilesize*level.width))/2));
	}
	$('#field').css('width', tilesize*level.width);
	$('#field').css('height', tilesize*level.height);
	for(var y = 0; y < level.height; y++) {
		for(var x = 0; x < level.width; x++) {
			var tileview = $(document.createElement('div'))
				.addClass('tile')
				.addClass('x' + x)
				.addClass('y' + y)
				.css('width', tilesize)
				.css('height', tilesize)
				.appendTo('#field');

			updateTileView(x, y);
		}
	}
	
	//Initialisiere Toolbox
	initializeToolBox();
	
	//Initialisiere die Punkteanzeige für das Level
	updateLevelPointValueDisplay();
	
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
			$("#tboverlay")
			.css("opacity", 1)
			.css("z-index", 31);
		},
		deactivate: function(event, ui) {
			$("#tboverlay")
			.css("opacity", 0)
			.css("z-index", -1);
		},
		drop: function(event, ui) {
			ui.helper.removeClass("drag-hover-highlight");
			var classes = $(ui.draggable).attr('class').split(" ");
			var x = parseInt(classes[1].replace("x", ""));
			var y = parseInt(classes[2].replace("y", ""));
			level.remove(x, y);
		}
	});
	$("#tboverlay").css("opacity", 0).css("z-index", -1); //Die Mülleimer-Grafik ist zu Beginn nicht sichtbar.
	
	//Initialisiere Combulix
	
	if (playerObject.showLevelSelectionTutorial) {
		playerObject.showLevelSelectionTutorial = false;
		saveCurrentPlayerObject(playerObject);
	}
	
	combulix.initialize();
	if (playerObject.showGameTutorial) {
		
		//Definitionen des Tutorial Levels (Hilfestellungen / Tipps)
		
		var tutorialFlags = {
			placed : false,
			rotated : false,
			moved : false,
			removed : false,
			added : false
		};
		
		var tutorialHandler = function (event) {
			
			if (event.type === EVENT_TYPE['placed']) {
				combulix.next();
			} else if (event.type === EVENT_TYPE['rotated']) {
				combulix.next();
			} else if (event.type === EVENT_TYPE['swapped']) {
				combulix.next();
			} else if (event.type === EVENT_TYPE['removed']) {
				combulix.next();
			}
			
		};
		
		combulix.speeches = [
		                     
            new Speech("Hey, du bist ja auch schon da! <br><br>Deine erste Herausforderung wartet schon auf dich ...", undefined,
            		 
            	function () { //on
            	    $("#startbutton").hide();
            	    $("#pointValueContainer").hide();
		       	 	$(".speech-bubble").addClass("highlighted");
		       	 	combulix.disablePrevious();
		        },
		         
		        function () { //off
		       	 	$(".speech-bubble").removeClass("highlighted");
		        }
		         
            ),
	         
            new Speech("Das hier ist das Spielfeld. Es besteht aus mehreren Kacheln, welche wie bei einem Schachbrett angeordnet sind ...", undefined,
            		 
            	function () { //on
		       		$("#field").addClass("highlighted");
		     	},
		     		
		     	function () { //off
		     		$("#field").removeClass("highlighted");
		     	}
		     	
		    ),
		     
	        new Speech("Um das Spiel zu gewinnen, müssen alle Ziele erreicht werden, außerdem darf keiner der folgenden Fehler auftreten ...", undefined,
	        		 
	        	function () { //on
		     		level.put(0, 0, 1, new Tile(TILE_TYPE['source'], TILE_ELEMENT['lava']), true);
		    		level.put(1, 4, 1, new Tile(TILE_TYPE['destination'], TILE_ELEMENT['lava']), true);
			       	$(".tile.x0.y0").addClass("highlighted").css("z-index", 21);
			       	$(".tile.x1.y4").addClass("highlighted").css("z-index", 21);
			     },
			     
			     function () { //off
			    	 $(".tile.x0.y0").removeClass("highlighted").css("z-index", "");
			    	 $(".tile.x1.y4").removeClass("highlighted").css("z-index", "");
			     }
	        ),
	        
	        new Speech("Es darf keine Flüssigkeit auslaufen oder in einer Wand enden.<br><br>Außerdem dürfen verschiedenfarbige Flüssigkeiten nicht vermischt werden ...", undefined,
	        		 
		        	function () { //on
			       		$(".speech-bubble").addClass("highlighted");
		         	},
		         	
		         	function () { //off
		         		$(".speech-bubble").removeClass("highlighted");
		         	}
		         	
		    ),
		     
	        new Speech("Auf der linken Seite siehst du den Werkzeugkasten.<br><br>Dort findest du Werkzeuge mit denen du die Apparatur reparieren kannst ...", undefined,
	        		 
	        	function () { //on
		       		$("#toolbox").addClass("highlighted");
	         	},
	         	
	         	function () { //off
	         		$("#toolbox").removeClass("highlighted");
	         	}
	         	
	        ),
	        
	        new Speech("Oben rechts gibt es die Punkteanzeige.<br><br>Jedes platzierte Werkzeug wird von deinem Punktekonto abgezogen.<br><br>Je näher du am Startwert bleibst, desto besser deine Endwertung ...", undefined,
	        		
	        		function () { //on
	        			$("#pointValueContainer").fadeIn().addClass("highlighted");
	        		},
	        		
	        		function () { //off
	        			$("#pointValueContainer").removeClass("highlighted");
	        		}
	        ),
		    
			new Speech("Probieren wir einfach mal aus, was man mit so einem Werkzeug alles anstellen kann.<br><br>Nehmen wir hierzu zunächst die Gerade ...", undefined,
					 
				function () { //on
					if (!tutorialFlags.placed) {
			        	level.tools = {
			        		straight: 0
			        	}
			        	updateToolBox();
			        	$("#straight").removeClass("immovable");
					}
					$("#straight").addClass("highlighted")
			     },
			     
			     function () { //off
			    	$("#straight").removeClass("highlighted");
			     }
			     
		    ),
		     
	        new Speech("Direkt neben den Werkzeugen steht die dir zur Verfügung stehende Anzahl ...", undefined,
	        		 
  	        	function () { //on
  		       		$("#toolcount-straight").addClass("highlighted");
  	         	},
  	         	
  	         	function () { //off
  	         		$("#toolcount-straight").removeClass("highlighted");
  	         	}
  	         	
  	         ),
		     
		    new Speech("Ziehe die Gerade von der Werkzeugleiste auf das makierte Feld ...", undefined,
		    		 
		    		 function () { //on
		    	
				    	 if (!tutorialFlags.placed) {
				    		 
				    		 level.registerListener(tutorialHandler); //Listener setzt die Flags und lässt Combulix eine Speech weiter springen.
				    		 combulix.disableNext(); //Das Spiel bestimmt, wann combulix weiter geht
				    		 
				    		 //Aktualisiere die Tools
				    		 level.tools = {
				    			straight: 1
							 }
						     updateToolNumber(TILE_TYPE['straight']);
				    		 
				    		 //Lösche die nicht relevanten Droppables
				    		 $(".tile:not(.x1.y2)").each(function(index) {
					    		 if ($(this).is(":data(ui-droppable)")) $(this).droppable('disable');
					    	 });
				    		 
				    	 }
				    	 
				    	 //Füge das Markup hinzu.
				    	 $("#straight").addClass("highlighted");
				    	 $(".tile.x1.y2").addClass("highlighted").css("z-index", 21);
				    	 
		    	 	},
		    	 	
		    	 	function () { //off
		    	 		
				    	if (!tutorialFlags.placed) {
				    		tutorialFlags.placed = true;
				    		
					    	 //Aktualisiere Logik
					    	 level.removeListener(tutorialHandler);
					    	 combulix.enableNext();
				    		
				    		//Reaktiviere die Droppables des Spielfelds
					    	$(".tile:not(.x1.y2)").each(function(index) {
					    		if ($(this).is(":data(ui-droppable)")) $(this).droppable('enable');
					    	});
					    	 
				    	 }
				    	 
				    	 //Entferne Markups
				    	 $("#straight").removeClass("highlighted");
				    	 $(".tile.x1.y2").removeClass("highlighted").css("z-index", "");
		    	 	}
		    ),
		     
		    new Speech("Gut gemacht! Drehe nun die Gerade, indem du auf sie linksklickst ...", undefined,
		    		 
		    	function () { //on
		    	
			    	 if (!tutorialFlags.rotated) {
			    		 
			    		 level.registerListener(tutorialHandler); //Listener setzt die Flags und lässt Combulix eine Speech weiter springen.
			    		 combulix.disableNext();
			    		 
			    		 //Aktualisiere das Tile
						 level.getTile(1, 2).movable = false;
						 updateTileView(1, 2);
						 
			    	 }
			    	 
			    	 //Füge Markup hinzu.
			    	 $(".tile.x1.y2").addClass("highlighted").addClass("tutorial-rotate").css("z-index", 41);
			     },
			     
			     function () { //off
			    	 
			    	 if (!tutorialFlags.rotated) {
			    		 tutorialFlags.rotated = true;
			    		 
			    		 level.removeListener(tutorialHandler);
			    		 combulix.enableNext();
			    		 
			    		//Aktualisiere das Tile
				    	level.getTile(1, 2).movable = true;
						updateTileView(1, 2);
			    	 }
					 
					 //Entferne Markup
					 $(".tile.x1.y2").removeClass("highlighted").removeClass("tutorial-rotate").css("z-index", "");
			    	 
			     }
			     
		    ),
		    
		    new Speech("Und jetzt bewege die Gerade auf das markierte Feld ...", undefined,
		    		 
		    	function () { //on
		    	
			    	 if (!tutorialFlags.moved) {
			    		 
			    		 level.registerListener(tutorialHandler); //Listener setzt die Flags und lässt Combulix eine Speech weiter springen.
			    		 combulix.disableNext();
			    		 
			    		 level.getTile(1, 2).rotatable = false;
						 updateTileView(1, 2);
						 
			    		 $(".tile:not(.x1.y1)").each(function(index) {
			    			 if ($(this).is(":data(ui-droppable)")) $(this).droppable("disable");
				    	 });
			    		 
			    		 $("#tboverlay").droppable("disable");
			    		 
			    	 }
			    	 
			    	 $(".tile.x1.y2").addClass("highlighted").css("z-index", 41);
			    	 $(".tile.x1.y1").addClass("highlighted").css("z-index", 41);
			     },
			     
			     function () { //off
			    	 
			    	 if (!tutorialFlags.moved) {
			    		 tutorialFlags.moved = true;
			    		 
				    	 level.removeListener(tutorialHandler);
				    	 combulix.enableNext();
				    	 
						 level.getTile(1, 1).rotatable = true;
						 updateTileView(1, 1);
						 
				    	//Reaktiviere die Droppables des Spielfelds
				    	 $(".tile:not(.x1.y1)").each(function(index) {
				    		if ($(this).is(":data(ui-droppable)")) $(this).droppable("enable");
				    	 });
			    		 
			    		 $("#tboverlay").droppable("enable");
			    	 }
					 
					 //Entferne Markup
					 $(".tile.x1.y2").removeClass("highlighted").css("z-index", "");
					 $(".tile.x1.y1").removeClass("highlighted").css("z-index", "");
			    	 
			     }
			     
		    ),
		    
		    new Speech("Abschließend probieren wir, die Gerade wieder zu löschen. Ziehe sie dazu zurück in den Werkzeugkasten ...", undefined,
		    		 
			    	function () { //on
			    	
				    	 if (!tutorialFlags.removed) {
				    		 
				    		 level.registerListener(tutorialHandler); //Listener setzt die Flags und lässt Combulix eine Speech weiter springen.
				    		 combulix.disableNext();
				    		 
							 level.getTile(1, 1).movable = true;
							 level.getTile(1, 1).rotatable = false;
							 updateTileView(1, 1);
							 
				    		 $(".tile").each(function(index) {
					    		 if ($(this).is(":data(ui-droppable)")) $(this).droppable('disable');
					    	 });
				    		 
				    	 }
				    	 
				    	 $(".tile.x1.y1").addClass("highlighted").css("z-index", 42);
				    	 $("#toolbox").addClass("highlighted").css("z-index", 41);
				     },
				     
				     function () { //off
				    	 
				    	 if (!tutorialFlags.removed) {
				    		 tutorialFlags.removed = true;
				    		 
				    		 level.removeListener(tutorialHandler);
				    		 combulix.enableNext();
							 
							//Reaktiviere die Droppables des Spielfelds
					    	 $(".tile").each(function(index) {
					    		 if ($(this).is(":data(ui-droppable)")) $(this).droppable('enable');
					    	 });
							  
				    	 }
				    	 
				    	 $(".tile.x1.y1").removeClass("highlighted").css("z-index", "");
				    	 $("#toolbox").removeClass("highlighted").css("z-index", "");
				    	 
				     }
				     
			    ),
		     
		    new Speech("Das wars für den Anfang. Du solltest jetzt alleine klarkommen.<br><br> Wenn du glaubst, eine gute Lösung gebaut zu haben und möchtest sie ausprobieren, klicke auf den \"Testen\"-Button.", undefined, 
		     		
		     		function () {
	    	 		if (!tutorialFlags.added) {
	    	 			tutorialFlags.added = true;
	    	 			
			    		 level.tools = {
			    			corner: 2,
			    			straight: 2
						 }
			    		 
			    		 maxPointValue = level.getMaxPointValue(); //Muss beim manuellen Setzen der Tools nach Initialisierung
			    		 updateLevelPointValueDisplay();
			    		 
			    		 updateToolBox();
	    	 		}
		    	
		    	 		$("#startbutton").fadeIn().addClass("highlighted");
		    	 		combulix.disablePrevious();
					}, //on
		     		
		     		function () {
						combulix.enablePrevious();
					} //off
		     		
		    ),
			
			new Speech("Wenn der Test vollständig durchgelaufen ist, fehlerfrei oder nicht, wird unten der \"Weiterbasteln\"-Button aktiv.<br><br>Mit ihm entfernst du die Flüssigkeit aus dem System, so dass du weiterarbeiten kannst.<br><br>Viel Spaß!", undefined,
	        		
	        		function () {}, //on
		     		
		     		function () { //off
		     			$("#startbutton").removeClass("highlighted");
		     		}
	        ),
             
		];
		combulix.slideIn();
		
	} else {
		
		//Alternative Definition von Combulix' Sprüchen, wenn kein Tutorial angezeigt wird.
		
		combulix.speeches = [new Speech("Ich weiß doch auch nicht weiter . . .")];
		if (stageid == 0 && levelid == 0) {
     		level.put(0, 0, 1, new Tile(TILE_TYPE['source'], TILE_ELEMENT['lava']), true);
    		level.put(1, 4, 1, new Tile(TILE_TYPE['destination'], TILE_ELEMENT['lava']), true);
    		level.tools = {
				corner: 2,
				straight: 2
			 }
    		
    		maxPointValue = level.getMaxPointValue();
    		updateLevelPointValueDisplay();
			updateToolBox();
		}
		combulix.slideOut();
		
	}
	
	$('#startbutton').click(function() {
		
		$("#startbutton").removeClass("highlighted"); //z.b. Falls das Tutorial diesen gehighlighted hat!
		if ($(this).text() === 'Testen') {
			
			//Starte den Test
			level.startRun();
			
			//Deaktiviere den Start-Button
			setStartButtonEnabled(false, "Test läuft!");
			
			//Verhindere die Modifikation des Spielfelds
			$(".event-blocker").show(); 
			
			//Sound abspielen
			audio.playSound("bubbleSound");
			
		} else if ($(this).text() === 'Weiterbasteln') {
			
			clearRun();
			$(this).text("Testen");
			$(".game").css({
				boxShadow: "0px 0px 0px 0px #F80 inset"
			});
			$(".game").removeClass("wrong").removeClass("right");
			$(".event-blocker").hide(); //Erlaube das Modifizieren des Spielfelds
			
		} 
		
	});
	
	$(".event-blocker").click(function () {
		if ($("#startbutton").text() === 'Weiterbasteln') $("#startbutton").addClass("highlighted");
	});
	
	audio.soundOnClick(".event-blocker");
	
	//Aktiviere Start Button
	
	setStartButtonEnabled(true);
	
	//Deaktiviere das Blockieren von Events auf dem Spielfeld
	
	$(".event-blocker").hide();

	backButton.setCallback(showLevelSelection);
	backButton.parameters = [stageid];
	
	//Initialisiere Sound für Back-Button
	audio.soundOnClick("#back-button");
	
	//Starte Spielmusik
	audio.playMusic();
	
});
