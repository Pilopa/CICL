var optionsMenu = {
		
		initialize: function(x, y) {
			if (typeof x === 'undefined') x = "0";
			if (typeof y === 'undefined') y = "0";
			$(document.createElement('div'))
			.addClass("menu-button")
			.addClass("active")
			.addClass("interactable")
			.attr("id", "options-menu")
			.css("left", x)
			.css("top", y)
			.appendTo("body");
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
		}
		
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
					.appendTo("body");
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
				


		}
			
}