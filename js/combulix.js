//=== Combulix ===
/**
 * @requires speech.js
 */

var combulix = {
		
	current: 0,
	speeches: [],
	
	set: function(index) {
		if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.pause();
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback();
		this.current = index;
		if (index < 0) return;
		else if (index == 0) $(".arrow.left").fadeOut();
		else if (index > 0) $(".arrow.left").fadeIn();
		$(".arrow:not(.left)").fadeIn();
		$(".speech-bubble").html(this.speeches[this.current].text);
		if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.play();
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].onCallback();
		return this;
	},
	
	next: function() {
		if (this.current + 1 < this.speeches.length) {
			combulix.set(this.current + 1);
		} else {
			if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.pause();
			if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback();
			combulix.slideOut();
		}
	},
	
	previous: function() {
		if (this.current - 1 >= 0) {
			combulix.set(this.current - 1);
		}
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
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].offCallback();
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
		if (typeof this.speeches[this.current].onCallback !== 'undefined') this.speeches[this.current].onCallback();
		return this;
	},
	
	registerNextListeners: function () {
		if (!hasEventHandler("speech-bubble", "swipeleft"))
			$(".speech-bubble").on("swipeleft", function(event) {
				combulix.next();
			});
		
		if (!hasEventHandler("arrow", "click"))
			$(".arrow:not(.left)").click(function(event) {
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
		$(".arrow:not(.left)").off("click");
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
		$(".arrow:not(.left)").hide();
	},
	
	enableNext: function() {
		$(".arrow:not(.left)").show();
		combulix.registerNextListeners();
	},
	
	disablePrevious: function() {
		combulix.disablePreviousListeners();
		$(".arrow.left").hide();
	},
	
	enablePrevious: function() {
		$(".arrow.left").show();
		combulix.registerPeviousListeners();
	},

	initialize: function() {
		$(document.createElement('div'))
		.addClass("speech-bubble")
		.addClass("unselectable")
		.addClass("interactable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("combulix")
		.addClass("unselectable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("interactable")
		.addClass("unselectable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("left")
		.addClass("interactable")
		.addClass("unselectable")
		.appendTo("body");
		
		$(".combulix, .speech-bubble, .arrow").hide();
		
		combulix.registerListeners();
		
		return this;
	}
	
};