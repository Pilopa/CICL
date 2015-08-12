var optionsMenu = {
		
	optionsButton: {
		
		/**
		 * Erstellt den Button an der gewählten Position, ausgehend von der oberen linken Ecke des Document-Bodys.
		 */
		initialize: function() {
			if (typeof x === 'undefined') x = "0";
			if (typeof y === 'undefined') y = "0";
			$("#options-button")
			.click(function() {
				optionsMenu.fadeIn();
			});
			return this;
		},
		
		setVisible(bool) {
			if (bool) $("#options-button").show();
			else $("#options-button").hide();
			return this;
		},
		
		fadeIn() {
			$("#options-button").fadeIn();
			return this;
		},
		
		fadeOut() {
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
			console.log("back-button-clicked");
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