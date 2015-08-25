var optionsMenu = {
		
	optionsButton : {
		
		/**
		 * Initialisiert den Button, welcher zum Optionsmenü führt.
		 */
		initialize : function() {
			if (typeof x === 'undefined') x = "0";
			if (typeof y === 'undefined') y = "0";
			
			$("#options-button")
			.click(function() {
				optionsMenu.fadeIn();
			});
			
			audio.soundOnClick("#options-button");
			return this;
		},
		
		setVisible: function(bool) {
			if (bool) $("#options-button").show();
			else $("#options-button").hide();
			return this;
		},
		
		fadeIn: function() {
			$("#options-button").fadeIn();
			return this;
		},
		
		fadeOut: function() {
			$("#options-button").fadeOut();
			return this;
		}
	
	},
		
	/**
	 * Initialisiert das Optionsmenü und die dazugehörige Schaltfläche.
	 * Die Parameter geben die Position des Buttons an, welcher das Menü öffnet.
	 * Beide Parameter sind optional.
	 */
	initialize: function() {
		
		//Hauptcontainer
		$(document.createElement('div'))
		.addClass("screen-overlay")
		.attr("id", "options-menu")
		.appendTo("body")
		.hide();
		
		//Content-Container
		$(document.createElement('div'))
		.addClass("popup-content-container")
		.attr("id", "options-content")
		.appendTo("#options-menu");
		
		//Content
		
		//--Sound
		var soundContainer = $(document.createElement('div'))
		.addClass("option-container")
		.addClass("interactable")
		.attr("id", "sound-option-container")
		.appendTo("#options-content");
		
		if (!getCurrentPlayerObject().playSound) soundContainer.addClass("off");
		
		$(soundContainer).click(function (event) {
			var playerObject = getCurrentPlayerObject();
			
			//Manipulate PlayerObject
			playerObject.playSound = !playerObject.playSound;
			saveCurrentPlayerObject(playerObject);
			
			//Manipulate Display
			if (playerObject.playSound) soundContainer.removeClass("off");
			else  soundContainer.addClass("off");
			
		});
		
		$(document.createElement('div'))
		.addClass("option-icon")
		.attr("id", "sound-option-icon")
		.appendTo("#sound-option-container");
		
		$(document.createElement('span'))
		.text("Interaktionsgeräusche")
		.addClass("option-text")
		.attr("id", "sound-option-text")
		.appendTo("#sound-option-container");
		
		//--Musik
		var musicContainer = $(document.createElement('div'))
		.addClass("option-container")
		.addClass("interactable")
		.attr("id", "music-option-container")
		.appendTo("#options-content");
		
		if (!getCurrentPlayerObject().playMusic) musicContainer.addClass("off");
		
		$(musicContainer).click(function (event) {
			var playerObject = getCurrentPlayerObject();
			
			//Manipulate PlayerObject
			playerObject.playMusic = !playerObject.playMusic;
			saveCurrentPlayerObject(playerObject);
			
			//Manipulate Display
			if (playerObject.playMusic) {
				musicContainer.removeClass("off");
				audio.resetGameMusicTime();
				audio.playMusic();
			} else {
				musicContainer.addClass("off");
				audio.stopMusic();
			}
			
		});
		
		$(document.createElement('div'))
		.addClass("option-icon")
		.attr("id", "music-option-icon")
		.appendTo("#music-option-container");
		
		$(document.createElement('span'))
		.text("Hintergrundmusik")
		.addClass("option-text")
		.attr("id", "music-option-text")
		.appendTo("#music-option-container");
		
		//Schließen-Button
		$(document.createElement('div'))
		.addClass("close-button")
		.addClass("interactable")
		.attr("id", "options-close")
		.click(function () {
			optionsMenu.fadeOut();
		})
		.appendTo("#options-menu");
		
		//Schaltfläche
		this.optionsButton.initialize();
		
		//Initialisiere Sound
		audio.soundOnClick(".close-button");
		
		return this;
	},
	
	setVisible: function (bool) {
		if (bool) $("#options-menu").show();
		else $("#options-menu").hide();
		return this;
	},
	
	fadeIn: function () {
		$("#options-menu").fadeIn();
		return this;
	},
	
	fadeOut: function() {
		$("#options-menu").fadeOut();
		return this;
	},
	
	showButton: function () {
		this.optionsButton.setVisible(true);
	},
	
	hideButton: function () {
		this.optionsButton.setVisible(false);
	}	
			
}

var backButton = {
			
	parameters: [],
	
	setCallback: function(callback) {
		
		if (typeof callback === 'undefined') return this;
		
		this.callback = callback;
		$("#back-button").click(function() {
			backButton.callback.apply(backButton, backButton.parameters);
		});
		return this;
	},
	
	setVisible: function (bool) {
		if (bool) $("#back-button").show();
		else $("#back-button").hide();
		return this;
	}
		
}

$(function() {
	
	optionsMenu.initialize(); //Initialisiere das Optionsmenü

});