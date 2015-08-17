var audio = {

	gameMusic : new Audio("../audio/background-music.mp3"),
	selectionItemSound : new Audio("../audio/button-click.wav"),
	menuButtonSound : new Audio("../audio/menu-click.mp3"),
	combulixNav : new Audio("../audio/combulix-nav.mp3"),
	errorSound : new Audio("../audio/error.mp3"),
	soundOnClick : function (selector) {
		$(selector).click(function() {
			if ($(this).is(".item.active")) {
				audio.selectionItemSound.load();
				audio.selectionItemSound.play();
			} else if ($(this).is(".item:not(.active)")) {
				audio.errorSound.volume = 0.15; //Der Ton ist initial sehr laut und wird nur mit extrem niedrigen %-Werten wirklich leiser.
				audio.errorSound.load();
				audio.errorSound.play();
			} else if ($(this).is(".menu-button, #continue, .close-button")) {
				audio.menuButtonSound.load();
				audio.menuButtonSound.play();
			} else if ($(this).is(".arrow")) {
				audio.combulixNav.load();
				audio.combulixNav.play();
			}
		});
	}

};