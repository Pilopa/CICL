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
		$(".speech-bubble").text(this.speeches[this.current].text);
		if (typeof this.speeches[this.current].audio !== 'undefined') this.speeches[this.current].audio.play();
		if (typeof this.speeches[this.current].offCallback !== 'undefined') this.speeches[this.current].onCallback();
		return this;
	},
	
	next: function() {
		if (this.current + 1 < this.speeches.length) {
			combulix.set(this.current + 1);
		} else combulix.slideOut();
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
				});
			});
		});
		return this;
	},
	
	slideIn: function() {
		$(".combulix")
		.show()
		.animate({
			right: '0%'
		}, function() {
			$(".speech-bubble").slideDown(function() {
				$(".arrow").fadeIn();
			});
		});	
		return this;
	},
		
	initialize: function() {
		$(document.createElement('div'))
		.addClass("speech-bubble")
		.addClass("unselectable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("combulix")
		.addClass("unselectable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("unselectable")
		.appendTo("body");
		
		$(document.createElement('div'))
		.addClass("arrow")
		.addClass("left")
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
			combulix.previous();
		});
		
		$(".arrow:not(.left)").click(function(event) {
			combulix.next();
		});
	}
	
};