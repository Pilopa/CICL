$(function () {
	
	var audio = {
	
		gameMusic : new Audio("../audio/background-music.mp3"),
		selectionItemSound : new Audio("../audio/button-click.wav"),
		menuButtonSound : new Audio("../audio/menu-click.mp3"),
		combulixNav : new Audio("../audio/combulix-nav.mp3")
		//gameMusic.play()
	
	};
	
	$(".item.active").click(function (event) {
		audio.selectionItemSound.load();
		audio.selectionItemSound.play();
	});
	
	$(".menu-button, #continue").click(function (event) {
		audio.menuButtonSound.load();
		audio.menuButtonSound.play();
	});
	
	$(".arrow").click(function (event) {
		audio.combulixNav.load();
		audio.combulixNav.play();
	});
	
});