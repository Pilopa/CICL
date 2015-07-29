//=== Speech ===

function Speech(text, audio, onCallback, offCallback) {
	this.text = text;
	this.audio = audio;
	this.onCallback = onCallback;
	this.offCallback = offCallback;
}