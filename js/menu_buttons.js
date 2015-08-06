var optionsMenu = {
		
	optionsButton: {
		
		/**
		 * Erstellt den Button an der gewählten Position, ausgehend von der oberen linken Ecke des Document-Bodys.
		 */
		initialize: function(x, y) {
			if (typeof x === 'undefined') x = "0";
			if (typeof y === 'undefined') y = "0";
			$(document.createElement('div'))
			.addClass("menu-button")
			.addClass("active")
			.addClass("interactable")
			.attr("id", "options-button")
			.css("left", x)
			.css("top", y)
			.appendTo("body")
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
	initialize: function(x, y) {
		//Überprüfen der Parameter
		if (typeof x === 'undefined') x = "0";
		if (typeof y === 'undefined') y = "0";
		
		//Hauptcontainer
		$(document.createElement('div'))
		.addClass("menu")
		.attr("id", "options-menu")
		.appendTo("body")
		.hide();
		
		//Content-Container
		$(document.createElement('div'))
		.addClass("menu-content-container")
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
		this.optionsButton.initialize(x, y);
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

backButton = {
		
	callback: function () {},
	
	setCallback: function(callback) {
		
		this.callback = callback;
		$("#back-button").click(function() {
			backButton.callback();
		});
		return this;
	},
		
	initialize: function(x, y, callback) {
		//Überprüfen der Parameter
		if (typeof x === 'undefined') x = "0";
		if (typeof y === 'undefined') y = "0";
		
		$(document.createElement('div'))
		.addClass("menu-button")
		.addClass("active")
		.addClass("interactable")
		.attr("id", "back-button")
		.css("left", x)
		.css("top", y)
		.appendTo("body")
		.hide();
		
		if (typeof callback !== 'undefined') this.setCallback(callback);

		return this;
	},
	
	setVisible: function (bool) {
		if (bool) $("#back-button").show();
		else $("#back-button").hide();
		return this;
	}
	
}