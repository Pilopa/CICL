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
			if(level.playfield[i][j] != '__hydrate_undef' && level.playfield[i][j] != null) { 
				tileview.css('background-image', 'url(../images/' + level.playfield[i][j].type.img + '.png)');
				var rot = 90 * parseInt(level.playfield[i][j].rotation);
				tileview.css('transform', 'rotate(' + rot + 'deg)');
				tileview.css('-ms-transform', 'rotate(' + rot + 'deg)');
				tileview.css('-webkit-transform', 'rotate(' + rot + 'deg)');
			} else {
				tileview.css('background-image', 'url(../images/empty.png)');
			}
		}
	}
	
	//Initialisiere Combulix
	
	combulix.initialize();
	combulix.speeches = [new Speech("Dummy")];
	combulix.slideIn();
	
	$('#flow').click(function() {
		level.startRun();
	});
	
	//Initialisiere Menüelemente
	
	optionsMenu.initialize("10px", "calc(100% - 74px)").showButton();
});