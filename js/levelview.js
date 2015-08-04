$(function() {
	var x = location.search.replace('?','').split('-');
	var levelid = x[0];
	var stageid = x[1];
	var level = getStages()[stageid].levels[levelid];
	for(var i = 0; i < level.height; i++) {
		for(var j = 0; j < level.width; j++) {
			var tileview = $(document.createElement('div'))
				.addClass('tile')
				.css('width', parseInt($('#field').css('width'))/level.width)
				.css('height', parseInt($('#field').css('height'))/level.height)
				.appendTo('#field');
			if(level.playfield[i][j] != null) {
				//tileview.css('background-image', '../images/' + level.playfield[i][j].type + '-' + level.playfield[i][j].rotation + '.png'); // lädt Bilddateien nach TILE_TYPE_XYZ-0.png
				tileview.css('background-color', 'blue');
			}
		}
	}
	combulix.initialize();
	combulix.speeches = new Speech("Dummy", undefined, function() {}, function() {});
	combulix.slideIn();
});