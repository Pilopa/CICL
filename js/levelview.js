$(function() {
	
	//Globale Variablen
	var x = location.search.replace('?','').split('-');
	var stageid = parseInt(x[0]);
	var levelid = parseInt(x[1]);
	var stage = getStages()[stageid];
	var level = stage.levels[levelid];
	var playerObject = getCurrentPlayerObject();
	$.event.special.swipe.horizontalDistanceThreshold = 150; //px //Definiere die Grenze, ab welchem ein Swipe-Event ausgelöst wird.
	
	//Funktionen
	
	function getScoreObject() {
		
		return {
			score: 3
		};
		
	}
	
	function setStartButtonEnabled(flag, text) {
		if (flag) {
			$("#startbutton").addClass("interactable");
		} else {
			$("#startbutton").removeClass("interactable");
		}
		document.getElementById("startbutton").disabled = !flag;
		if (typeof text !== 'undefined') $("#startbutton").text(text)
	}
	
	function rotateEventHandler(event) {
		var classes = $(this).attr('class').split(" ");
		var x = parseInt(classes[1].replace("x", ""));
		var y = parseInt(classes[2].replace("y", ""));
		if (level.getTile(x, y) !== null && level.getTile(x, y) !== undefined && level.getTile(x, y).rotatable) level.rotate(x, y);
		else console.log("click but no rotate on [" + x + "|" + y + "]");
	}
	
	function initializeTileViewRotateHandler(x, y) {
		if (!$(".x" + x + ".y" + y).is(".rotatable")) {
			$(".x" + x + ".y" + y).on("click", rotateEventHandler);
			$(".x" + x + ".y" + y).addClass("rotatable");
		}
	}
	
	function initializeTileViewDragHandler(x, y) {
		if (!$(".x" + x + ".y" + y).is('.ui-draggable')) $(".x" + x + ".y" + y).draggable({
			revertDuration: 0,
			scroll: false,
			revert: function (droppable) {
				
				if (!droppable) $(this).draggable("option", "revertDuration", 500);
				else if ($(this).is(":data(ui-draggable)")) $(this).draggable("option", "revertDuration", 0);
				else $(this).removeClass("ui-draggable-dragging");
				
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
	
	function initializeTileViewDropHandler(jquery) {
		if (!$(jquery).is('.ui-droppable')) $(jquery).droppable({
			accept: ".tool, .tile",
			hoverClass: "drop-hover-highlight",
			deactivate: function (event, ui) {
				//Manchmal werden die top-und left-werte nach dem Drag & Drop nicht automatisch korrekt zurückgesetzt.
				//Daher wird das hier manuell getan.
				$(this)
				.css("top", "")
				.css("left", "")
				.removeClass("drop-highlight");
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
					level.put(x, y, 0, new Tile(tiletype, TILE_ELEMENT_NONE, true, true), true);
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
						+ ((level.getTile(x, y).type.name === TILE_NAME_SOURCE || level.getTile(x, y).type.name === TILE_NAME_DESTINATION)
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
			.addClass("centered-text")
			.addClass("unselectable")
			.attr("id", "toolcount-" + tiletype.name)
			.appendTo("#toolbox");
			
			updateToolNumber(tiletype);
		});
	}
	
	function clearRun() {
		$('.flow').remove();
		level.clearElements();
		level.destinationsReached = 0;
	}
	
	//Eventhandler initialisieren
	level.registerListener(function (event) {
		
		console.log(event.toString()); //DEBUG
		
		if (event.type === EVENT_TYPE_PLACED) { //Ein Tile wurde platziert.
			
			if (event.tile.x === undefined) console.log("error in levelview.fs eventHandler: event.tile.x is undefined");
			if (event.tile.y === undefined) console.log("error in levelview.fs eventHandler: event.tile.y is undefined");
			updateTileView(event.tile.x, event.tile.y);
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
			if (level.isEmpty(event.tile.x1, event.tile.y1)) updateTileViewHandlers(event.tile.x2, event.tile.y2);
			if (level.isEmpty(event.tile.x2, event.tile.y2)) updateTileViewHandlers(event.tile.x1, event.tile.y1);
			
			//Aktualisiere die Anzeige
			updateTileView(event.tile.x1, event.tile.y1);
			updateTileView(event.tile.x2, event.tile.y2);
			
		} else if (event.type === EVENT_TYPE_DESTINATION_REACHED) { //Ein Zielfeld wurde erreicht.
			
			if (level.destinationsCount <= level.destinationsReached) {
				level.fireEvent(new Event(EVENT_TYPE_TEST_COMPLETED));
			}
			
		} else if (event.type === EVENT_TYPE_TEST_COMPLETED) { //Der Test wurde Erfolgreich beendet.
			// Walker-Prüftimer anhalten
			clearInterval(level.aborttimer);
			
			//Die Punkte berechnen
			var scoreObject = getScoreObject();
			
			//Die Punkte vergeben
			if (playerObject.showGameTutorial) playerObject.showGameTutorial = false;
			if (playerObject.scores[stageid][levelid] === undefined || playerObject.scores[stageid][levelid] < scoreObject.score) playerObject.scores[stageid][levelid] = scoreObject.score;
			saveCurrentPlayerObject(playerObject);
			
			//Start-Button zurücksetzen (hihi)
			setStartButtonEnabled(true, "Zurücksetzen");
			$("#startbutton").addClass("highlighted");
			
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
					.appendTo("body");
					
					//Content-Container
					$(document.createElement('div'))
					.addClass("popup-content-container")
					.attr("id", "score-display-content")
					.appendTo("#score-display");
					
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
					.addClass("unselectable")
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
					.addClass("unselectable")
					.attr("id", "score-display-to-level-selection")
					.click(function () {
						
						$("#score-display").fadeOut(function() {
							showLevelSelection(stageid);
						});
						
					})
					.appendTo("#score-display-content");
					
					$("#score-display").hide().fadeIn(800);
					
				});
			});
			
		} else if (event.type === EVENT_TYPE_TEST_FAILED) { //Der Test ist fehlgeschlagen.
			// Walker anhalten
			for(var i = 0; i < level.walkers.length; i++) level.walkers[i].stop();
			clearInterval(level.aborttimer);
			
			//Button zurücksetzen
			setStartButtonEnabled(true, "Zurücksetzen");
			$("#startbutton").addClass("highlighted");
			
			//Fail-Feedback
			$(".game").animate({
				boxShadow : "0 0 75px 0 rgba(255, 0, 0, 1) inset"
			}, 400, function () {
				$(this).animate({
					boxShadow : "0 0 5px 0 rgba(255, 0, 0, 1) inset"
				}, 1000,function () {
					$(this).addClass("wrong");
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
			
			if (event.type === EVENT_TYPE_PLACED) {
				combulix.next();
			} else if (event.type === EVENT_TYPE_ROTATED) {
				combulix.next();
			} else if (event.type === EVENT_TYPE_SWAPPED) {
				combulix.next();
			} else if (event.type === EVENT_TYPE_REMOVED) {
				combulix.next();
			}
			
		};
		
		combulix.speeches = [
		                     
            new Speech("Hey, du bist ja auch schon da! <br><br>Deine erste Herausforderung wartet schon auf dich ...", undefined,
            		 
            	function () { //on
            	    $("#startbutton").hide();
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
		     
	        new Speech("Auf diesem Spielfeld sind Quellen und Ziele platziert. <br><br>Um das Spiel zu gewinnen, müssen alle Quellen und Ziele fehlerfrei miteinander verbunden werden.", undefined,
	        		 
	        	function () { //on
		     		level.put(0, 0, 1, new Tile(TILE_TYPE_SOURCE, TILE_ELEMENT_LAVA), true);
		    		level.put(1, 4, 1, new Tile(TILE_TYPE_DESTINATION, TILE_ELEMENT_LAVA), true);
			       	$(".tile.x0.y0").addClass("highlighted").css("z-index", 21);
			       	$(".tile.x1.y4").addClass("highlighted").css("z-index", 21);
			     },
			     
			     function () { //off
			    	 $(".tile.x0.y0").removeClass("highlighted").css("z-index", "");
			    	 $(".tile.x1.y4").removeClass("highlighted").css("z-index", "");
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
		    
			new Speech("Probieren wir einfach mal alles aus, was man so mit einem Werkzeug anstellen kann.<br><br>Nehmen wir hierzu mal die Gerade ...", undefined,
					 
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
		     
		    new Speech("Ziehe zunächst die Gerade von der Werkzeugleiste auf das makierte Feld ...", undefined,
		    		 
		    		 function () { //on
		    	
				    	 if (!tutorialFlags.placed) {
				    		 
				    		 level.registerListener(tutorialHandler); //Listener setzt die Flags und lässt Combulix eine Speech weiter springen.
				    		 combulix.disableNext(); //Das Spiel bestimmt, wann combulix weiter geht
				    		 
				    		 //Aktualisiere die Tools
				    		 level.tools = {
				    			straight: 1
							 }
						     updateToolNumber(TILE_TYPE_STRAIGHT);
				    		 
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
			    	 $(".tile.x1.y2").addClass("highlighted").css("z-index", 41);
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
					 $(".tile.x1.y2").removeClass("highlighted").css("z-index", "");
			    	 
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
		     
		    new Speech("Das wars für den Anfang. Du solltest jetzt alleine klarkommen.", undefined, 
		     		
		     		function () { //on
		    	 		if (!tutorialFlags.added) {
		    	 			tutorialFlags.added = true;
		    	 			
				    		 level.tools = {
				    			corner: 2,
				    			straight: 2
							 }
				    		 
				    		 updateToolBox();
		    	 		}
		    	 		
		    	 		$("#startbutton").fadeIn().addClass("highlighted");
		     		},
		     		
		     		function () { //off
		     			//TODO ?
		     		}
		     		
		    )
             
		];
		combulix.slideIn();
	} else {
		
		combulix.speeches = [new Speech("Ich weiß doch auch nicht weiter . . .")];
		if (stageid == 0 && levelid == 0) {
     		level.put(0, 0, 1, new Tile(TILE_TYPE_SOURCE, TILE_ELEMENT_LAVA), true);
    		level.put(1, 4, 1, new Tile(TILE_TYPE_DESTINATION, TILE_ELEMENT_LAVA), true);
    		level.tools = {
				corner: 2,
				straight: 2
			 }
			 updateToolBox();
		}
		combulix.slideOut();
		
	}
	
	$('#startbutton').click(function() {
		
		if (playerObject.showGameTutorial) $("#startbutton").removeClass("highlighted"); //Falls das Tutorial diesen gehighlighted hat!
		if ($(this).text() === 'Test starten!') {
			
			//Starte den Test
			level.startRun();
			
			//Deaktiviere den Start-Button
			setStartButtonEnabled(false, "Test läuft!");
			
			//Verhindere die Modifikation des Spielfelds
			$(".event-blocker").show(); 
			
		} else if ($(this).text() === 'Zurücksetzen') {
			
			$("#startbutton").removeClass("highlighted");
			clearRun();
			$(this).text("Test starten!");
			$(".game").css({
				boxShadow: "0px 0px 0px 0px #F80 inset"
			});
			$(".game").removeClass("wrong").removeClass("right");
			$(".event-blocker").hide(); //Erlaube das Modifizieren des Spielfelds
			
		} 
		
	});
	
	//Aktiviere Start Button
	
	setStartButtonEnabled(true);
	
	//Deaktiviere das Blockieren von Events auf dem Spielfeld
	
	$(".event-blocker").hide();

	backButton.setCallback(showLevelSelection);
	backButton.parameters = [stageid];
	
	//Starte Spielmusik
	
	var gameMusic = new Audio("../audio/Groovy-funky-music-clip.mp3");
	//gameMusic.play();
	
});
