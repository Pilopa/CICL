/**
 * Datenmodell eines Bereiches. 
 * Enthält mehrere Levels.
 *
 * @param {string} title Der Titel des Bereichs.
 * @param {array} levels Ein Array aus Levels, welche in diesem Bereich gespielt werden können.
 * @constructor
 * @requires 'level.js'
 */
function Stage(title, levels) {
	if (typeof levels === undefined) this.levels = [];
	else this.levels = levels;
	
	if (typeof title !== undefined && typeof title !== 'array') 
		this.title = title;
}