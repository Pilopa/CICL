/**
 * Verwaltet alle Audioelemente im Spiel und stellt Methoden bereit,
 * diese auszuführen oder an Events zu binden.
 * 
 * Die Inhalte sollten sonst selbsterklärend sein.
 */
var audio = {

	getSound : function (name) {
		if (audio[name] === undefined) {
			if (name === 'menuButtonSound') audio[name] = new Audio("../audio/button-click2.wav");
			else if (name === 'selectionItemSound') audio[name] = new Audio("../audio/menu-click.wav");
			else if (name === 'combulixNav') audio[name] = new Audio("../audio/combulix-nav.wav");
			else if (name === 'errorSound') audio[name] = new Audio("../audio/error.wav");
			else if (name === 'crashSound') audio[name] = new Audio("../audio/crash1.wav");
			else if (name === 'dragdropSound') audio[name] = new Audio("../audio/dragdrop.wav");
			else if (name === 'bubbleSound') audio[name] = new Audio("../audio/bubble.wav");
			else if (name === 'splashSound') audio[name] = new Audio("../audio/splash.wav");
			else if (name === 'tadaSound') audio[name] = new Audio("../audio/tada.wav");
			else if (name === 'failSound') audio[name] = new Audio("../audio/fail.wav");
			else if (name === 'removeSound') audio[name] = new Audio("../audio/dragdrop.wav");
			else if (name === 'combulixSound') audio[name] = new Audio("../audio/combulix-nav.wav");
		}
		return audio[name];
	},
	
	playSound : function (name, vol) {
		if(vol === null || vol === undefined) vol = 1;
		if(getCurrentPlayerObject() !== null && !getCurrentPlayerObject().playSound) return false;
		else {
			var sound = audio.getSound(name);
			sound.load();
			sound.volume = vol;
			sound.play();
			return true;
		}
	},
	
	soundOnClick : function (selector) {
		
		$(selector).click(function() {
			
			var sound;
			
			if(getCurrentPlayerObject() !== null) {
				if (!getCurrentPlayerObject().playSound) return;
			}
			if ($(this).is(".item.active")) {
				audio.playSound("selectionItemSound");
			} else if ($(this).is(".item:not(.active)")) {
				audio.playSound("errorSound", 0.25);
			} else if ($(this).is(".menu-button, #continue, .close-button")) {
				audio.playSound("menuButtonSound");
			} else if ($(this).is("#startbutton")) {
				audio.playSound("bubbleSound");
			} else if ($(this).is(".event-blocker")) {
				sound = audio.getSound("errorSound");
				sound.volume = 0.15; //Der Ton ist initial sehr laut und wird nur mit extrem niedrigen %-Werten wirklich leiser.
				sound.load();
				sound.play();
			} else if ($(this).is(".to-level-selection-button")) {
				audio.playSound("menuButtonSound");
			} else if ($(this).is(".continue-button")) {
				audio.playSound("menuButtonSound");
			}
			
		});
	},
	
	setMusicTime : function(value) {
		sessionStorage['musicTime'] = value;
	},
	
	updateMusicTime : function () {
		if (audio.gameMusic !== undefined) this.setMusicTime(this.gameMusic.currentTime);
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
			
			if (audio.gameMusic === undefined) audio.gameMusic = new Audio("../audio/background-music.wav");
			
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
