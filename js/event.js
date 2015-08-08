//=== Event ===
	
var EVENT_TYPE_PLACED = "PLACED";
var EVENT_TYPE_SWAPPED = "SWAPPED";
var EVENT_TYPE_REMOVED = "REMOVED";
var EVENT_TYPE_ROTATED = "ROTATED";
var EVENT_TYPE_DESTINATION_REACHED = "DESTINATION_REACHED";
var EVENT_TYPE_TEST_COMPLETED = "TEST_COMPLETED";
var EVENT_TYPE_TEST_FAILED = "TEST_FAILED";

//Der Parameter tile ist optional.
function Event (type, tile, msg) {
	this.type = type;
	this.tile = tile;
	this.message = msg;
}

Event.prototype.toString = function () {
	return "Event (" + this.type + ") on " + this.tile + ' (' + this.message + ')';
}