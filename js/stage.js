/*
 * Datenmodell eines Bereiches. 
 * Enthält mehrere Levels.
 */

function Stage(title, levels) {
	if (typeof levels === undefined) this.levels = [];
	else this.levels = levels;
	
	if (typeof title !== undefined && typeof title !== 'array') 
		this.title = title;
}