/*
 * Für das Spiel ist Combulix der Mentor unseres Spielers.
 * Im Bezug auf unser Programm ist er ein Plugin, welches in jeder Seite eingebunden werden kann (Mit Hilfe der 'initialize'-Methode).
 * Einmal hinzugefügt, können die Hilfetexte definiert werden, indem der 'speeches'-Array überschrieben wird.
 * Dieser Array besteht aus Speech-Objekten (siehe speech.js).
 * Durch diese kann der Spieler dann durchwechseln, falls vom Entwickler nicht anders gewünscht (siehe 'disableNext/Previous').
 */

var combulix = {
		
	current: 0,
	speeches: [],
	disabled: {
		next : false,
		previous : false
	},
	
	set: function(index) {
		if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.pause();
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback.call(this.speeches[this.current]);
		this.current = index;
		if (index < 0) return;
		else if (index == 0) $(".arrow.left").fadeOut();
		else if (index > 0 && !this.disabled.previous) $(".arrow.left").fadeIn();
		$(".arrow.right").fadeIn();
		$(".speech-bubble").html(this.speeches[this.current].text);
		if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.play();
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].onCallback.call(this.speeches[this.current]);
		return this;
	},
	
	slideOut: function() {
		$(".arrow").fadeOut(function() {
			$(".speech-bubble").slideUp(function() {
				$(".combulix")
				.animate({ right: '-40%' }, function() {
					$(".combulix").hide();
					$(".arrow.left").css("right", "0%").css("top", "calc(50% - 32px)").fadeIn();
				});
			});
		});
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback.call(this.speeches[this.current]);
		return this;
	},
	
	slideIn: function() {
		$(".arrow.left").css("right", "calc(40% - 32px)").css("top", "calc(35% - 32px)").hide();
		
		$(".combulix")
		.show()
		.animate({
			right: '0%'
		}, function() {
			$(".speech-bubble").slideDown(function() {
				if (typeof combulix.current !== 'undefined' && combulix.speeches.length > 0) combulix.set(combulix.current);
				else if (combulix.speeches.length > 0) combulix.set(0);
			});
		});	
		if (typeof this.speeches[this.current].onCallback !== 'undefined') this.speeches[this.current].onCallback.call(this.speeches[this.current]);
		return this;
	},
	
	next: function() {
		if (this.current + 1 < this.speeches.length) {
			this.set(this.current + 1);
		} else {
			if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.pause();
			if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback.call(this.speeches[this.current]);
			this.slideOut();
		}
	},
	
	previous: function() {
		if (this.current - 1 >= 0) {
			combulix.set(this.current - 1);
		}
	},
	
	registerNextListeners: function () {
		if (!hasEventHandler("speech-bubble", "swipeleft"))
			$(".speech-bubble").on("swipeleft", function(event) {
				combulix.next();
			});
		
		if (!hasEventHandler("arrow right", "click"))
			$(".arrow.right").click(function(event) {
				combulix.next();
			});
	},
	
	registerPreviousListeners: function () {
		if (!hasEventHandler("speech-bubble", "swiperight"))
			$(".speech-bubble").on("swiperight", function(event) {
				combulix.previous();
			});
		
		if (!hasEventHandler("arrow left", "click"))
			$(".arrow.left").click(function(event) {
				if ($(".combulix").is(":hidden")) combulix.slideIn();
				else combulix.previous();
			});
		
		/**
		 * Scheint in dieser Form nicht zu funktionieren und wir wollen keine Fehler in 'disablePreviousListeners' riskieren, wenn diese Zeilen einkommentiert bleiben.
		 * Sie sollen uns lediglich daran erinner, dass dieses Feature in Zukunft vorteilhaft sein könnte.
		 */
		/*$("arrow.left").on("swipeleft", function (event) {
			if ($(".combulix").is(":hidden")) combulix.slideIn();
		});*/
	},
	
	disableNextListeners: function () {
		$(".speech-bubble").off("swipeleft");
		$(".arrow.right").off("click");
	},
	
	disablePreviousListeners: function () {
		$(".speech-bubble").off("swiperight");
		$(".arrow.left").off("click");
	},
	
	registerListeners: function () {
		combulix.registerNextListeners();
		combulix.registerPreviousListeners();
	},
	
	disableNext: function() {
		combulix.disableNextListeners();
		$(".arrow.right").hide();
		combulix.disabled.next = true;
	},
	
	enableNext: function() {
		$(".arrow.right").show();
		combulix.registerNextListeners();
		combulix.disabled.next = false;
	},
	
	disablePrevious: function() {
		combulix.disablePreviousListeners();
		$(".arrow.left").hide();
		combulix.disabled.previous = true;
	},
	
	enablePrevious: function() {
		$(".arrow.left").show();
		combulix.registerPreviousListeners();
		combulix.disabled.previous = false;
	},

	initialize: function() {
		$(document.createElement('div'))
		.addClass("speech-bubble")
		.addClass("interactable")
		.appendTo(".game");
		
		$(document.createElement('div'))
		.addClass("combulix")
		.appendTo(".game");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("right")
		.addClass("interactable")
		.appendTo(".game");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("left")
		.addClass("interactable")
		.appendTo(".game");
		
		$(".combulix, .speech-bubble, .arrow").hide();
		
		combulix.registerListeners();
		
		return this;
	}
	
};