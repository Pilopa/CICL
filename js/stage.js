//=== Stage ===

function Stage(name, levels) {
	if (typeof levels === undefined) this.levels = [];
	else this.levels = levels;
	
	if (typeof name !== undefined && typeof name !== 'array') 
		this.name = name;
}