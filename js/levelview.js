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
				alert(level.rotate(1,1)); // Error: level.rotate() is not a function!
				//tileview.css('background-image', '../images/' + level.playfield[i][j].type.img + '-' + level.playfield[i][j].rotation + '.png');
				tileview.css('background-color', 'blue');
			} else {
				tileview.css('background-image', 'url(../images/empty.png)');
			}
		}
	}
	combulix.initialize();
	combulix.speeches = new Speech("Dummy", undefined, function() {}, function() {});
	combulix.slideIn();
});