/**
 * Verwaltet alle Audioelemente im Spiel und stellt Methoden bereit,
 * diese auszuführen oder an Events zu binden.
 * 
 * Die Inhalte sollten sonst selbsterklärend sein.
 */
var audio = {
		
	gameMusic : new Audio("../audio/background-music.wav"),
	selectionItemSound : new Audio("../audio/button-click2.wav"),
	menuButtonSound : new Audio("../audio/menu-click.wav"),
	combulixNav : new Audio("../audio/combulix-nav.wav"),
	errorSound : new Audio("../audio/error.wav"), 
	crashSound: new Audio("../audio/crash1.wav"),
	dragdropSound: new Audio("../audio/dragdrop.wav"),
	bubbleSound: new Audio("../audio/bubble.wav"),
	splashSound: new Audio("../audio/splash.wav"),
	tadaSound: new Audio("../audio/tada.wav"),
	
	soundOnClick : function (selector) {
		
		$(selector).click(function() {
			if(getCurrentPlayerObject() !== null) {
				if (!getCurrentPlayerObject().playSound) return;
			}
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
			} else if ($(this).is("#startbutton")) {
				audio.bubbleSound.load();
				audio.bubbleSound.play();
			}
			
		});
	},
	
	setMusicTime : function(value) {
		sessionStorage['musicTime'] = value;
	},
	
	updateMusicTime : function () {
		this.setMusicTime(this.gameMusic.currentTime);
	},
	
	getMusicTime : function () {
		if(sessionStorage['musicTime'] !== null && sessionStorage['musicTime'] !== 'undefined') {
			return sessionStorage['musicTime'];
		} else return 0;
	},
	
	resetGameMusicTime : function () {
		this.setMusicTime(0);
	},
	
	playMusic : function() {
		if (sessionStorage['musicTime'] === undefined) this.setMusicTime(0);
		if(getCurrentPlayerObject() !== null && getCurrentPlayerObject().playMusic) {
			
			//Initialisieren der GameMusic-Werte, falls noch nicht getan
			this.gameMusic.volume = 0.25;
			this.gameMusic.loop = true;
			this.gameMusic.play();
			
			if(this.gameMusic.currentTime == 0 && this.getMusicTime() == 0) return; // currentTime auf 0 zu setzen, während es 0 ist, wirft Fehler seitens der Audio-Klasse
			else this.gameMusic.currentTime = this.getMusicTime();
		}
		
	},
	
	stopMusic : function() {
		if(getCurrentPlayerObject() !== null) {
			if (!getCurrentPlayerObject().playMusic) {
				this.updateMusicTime();
				this.gameMusic.pause();
			}
		}
	}

};
