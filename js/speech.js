/**
 * Ein Tutorialelement.
 * 
 * @param {string} text Der Hilfetext.
 * @param {HTML5-Audioelement} audio Das Audioelement, welches bei dem navigieren auf dieses Tutorialelement abgespielt werden soll (z.b. Text-Vertonung).
 * @param {function} onCallback Was passiert, wenn auf diese Speech navigiert wird ?
 * @param {function} offCallback Was passiert, wenn von dieser Speech wegnavigiert wird ?
 *
 * @constructor
 */
function Speech(text, audio, onCallback, offCallback) {
	this.text = text;
	this.audio = audio; //Hier sollte möglichst die Sprachdatei der Text-Vertonung angegeben werden. Derzeit NICHT implementiert (Zeitmangel, siehe Dokumentation).
	this.onCallback = onCallback; //Was passiert, wenn auf diese Hilfe gewechselt wird ?
	this.offCallback = offCallback; //Was passiert, wenn von dieser Hilfe wegnavigiert wird ?
}