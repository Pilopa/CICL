/*
 * Ein Tutorialelement.
 */

function Speech(text, audio, onCallback, offCallback) {
	this.text = text;
	this.audio = audio; //Hier sollte möglichst die Sprachdatei der Text-Vertonung angegeben werden. Derzeit NICHT implementiert (Zeitmangel, siehe Dokumentation).
	this.onCallback = onCallback; //Was passiert, wenn auf diese Hilfe gewechselt wird ?
	this.offCallback = offCallback; //Was passiert, wenn von dieser Hilfe wegnavigiert wird ?
}