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
		$(".speech-bubble").text(this.speeches[this.current].text);
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
		this.speeches[this.current].offCallback();
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
		this.speeches[this.current].onCallback();
		return this;
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
		
		$(".speech-bubble").on("swipeleft", function(event) {
			combulix.next();
		});
		
		$(".speech-bubble").on("swiperight", function(event) {
			combulix.previous();
		});
		
		$(".arrow.left").click(function(event) {
			if ($(".combulix").is(":hidden")) combulix.slideIn();
			else combulix.previous();
		});
		
		$("arrow.left").on("swipeleft", function (event) {
			if ($(".combulix").is(":hidden")) combulix.slideIn();
		});
		
		$(".arrow:not(.left)").click(function(event) {
			combulix.next();
		});
		
		return this;
	}
	
};