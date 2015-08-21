//=== Stages ===

if (sessionStorage["stages"] === undefined) sessionStorage["stages"] = serializer.stringify([
                                                                                             
    // * wird in der levelview.js definiert.
	                      
	new Stage("Bereich A", [
	           
			new Level( 5, 5, "Einführung", {
				// * straight: 2,
				// * corner : 2
			})
		
			.put(4, 0, 0, new Tile(TILE_TYPE['wall']))
			.put(4, 1, 0, new Tile(TILE_TYPE['wall']))
			.put(4, 2, 0, new Tile(TILE_TYPE['wall']))
			.put(4, 3, 0, new Tile(TILE_TYPE['wall']))
			.put(4, 4, 0, new Tile(TILE_TYPE['wall']))
			.put(3, 0, 0, new Tile(TILE_TYPE['wall']))
			.put(3, 1, 0, new Tile(TILE_TYPE['wall']))
			.put(3, 2, 0, new Tile(TILE_TYPE['wall']))
			.put(3, 3, 0, new Tile(TILE_TYPE['wall']))
			.put(3, 4, 0, new Tile(TILE_TYPE['wall']))
		
		, // ======================================================================
		
			new Level( 5, 4, "Level 2", {
				'straight': 6,
				'corner': 8,
			})
		
			.put(0, 1, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 0, 0, new Tile(TILE_TYPE['wall'],			 TILE_ELEMENT['none']))
			.put(1, 0, 0, new Tile(TILE_TYPE['wall'],			 TILE_ELEMENT['none']))
			.put(2, 1, 0, new Tile(TILE_TYPE['wall'],			 TILE_ELEMENT['none']))
			.put(3, 2, 0, new Tile(TILE_TYPE['wall'],			 TILE_ELEMENT['none']))
			.put(2, 0, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level( 5, 4, "Level 3", {
				'straight': 10,
				'corner': 6,
			})
		
			.put(4, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(3, 1, 1, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(3, 0, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(1, 2, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(6, 5, "Level 4", {
				'straight': 10,
				'corner': 10,
			})
		
			.put(0, 3, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(2, 1, 1, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(3, 2, 0, new Tile(TILE_TYPE['wall'],			 TILE_ELEMENT['none']))
			.put(3, 1, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(4, 3, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))

	]), // ======================================================================
				
	new Stage("Bereich B", [
	           
			new Level(4, 4, "Level 1", {
				// * 'corner2,
				// * 'crossroads': 2,
			}) 
		
			.put(0, 1, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(1, 0, 1, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(3, 2, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(2, 3, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(5, 5, "Großes X", {
				'straight': 5,
				'corner': 3,
			})
		
			.put(2, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 0, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(1, 1, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(3, 4, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(4, 4, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(4, 0, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(3, 1, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(1, 3, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(0, 4, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(2, 2, 0, new Tile(TILE_TYPE['crossroads'], 	 TILE_ELEMENT['none']))
			.put(0, 2, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(7, 5, "Level 3", {
				'straight': 10,
				'corner': 12,
				'crossroads': 4,
			})
		
			.put(1, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(2, 2, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(3, 1, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(5, 3, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(3, 0, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(6, 2, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(6, 5, "Level 4", {
				'corner': 7,
				'crossroads': 9,
			})
		
			.put(3, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 4, 3, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(1, 2, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(1, 3, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(2, 2, 0, new Tile(TILE_TYPE['wall'], 			 TILE_ELEMENT['none']))
			.put(1, 4, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(4, 4, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
	]), // ======================================================================
			
	new Stage("Bereich C", [
	           
			new Level(5, 5, "Level 1", {
				'straight': 4,
				'crossroads': 1,
			})
		
			.put(2, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 2, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(2, 4, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(4, 2, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
		
		, // ======================================================================
		
			new Level(5, 5, "Level 2", {
				'straight': 6,
				'corner': 8,
				'crossroads': 1,
			})
		
			.put(1, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 2, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(3, 3, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(3, 0, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
		
		, // ======================================================================
		
			new Level(5, 5, "Level 3", {
				'straight': 3,
				'corner': 8,
				'crossroads': 1,
			})
		
			.put(0, 0, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 3, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(4, 3, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(3, 0, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
		
		, // ======================================================================
		
			new Level(7, 7, "Level 4", {
				'straight': 15,
				'corner': 15,
				'crossroads': 5,
			})
		
			.put(3, 4, 1, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(2, 3, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(3, 2, 3, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(4, 3, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(5, 0, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(1, 6, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
					
	]), // ======================================================================

	new Stage("Bereich D", [
	           
			new Level(5, 3, "Level 1", {
				'straight': 3,
				'corner': 2,
				'tjunction': 1,
			})
		
			.put(0, 0, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 2, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(3, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(1, 1, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(3, 2, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(4, 1, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(5, 3, "Level 2", {
				'straight': 4,
				'corner': 2,
				'crossroads': 1,
				'tjunction': 2,
			})
		
			.put(0, 0, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['honey']))
			.put(0, 1, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(0, 2, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(4, 0, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
			.put(4, 1, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(4, 2, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(6, 7, "Level 3", {
				'straight': 15,
				'corner': 10,
				'crossroads': 5,
				'tjunction': 5,
			})
		
			.put(1, 1, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(1, 3, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(1, 5, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(1, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(2, 2, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(2, 4, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(1, 2, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(1, 4, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(10, 10, "Level 4", {
				'straight': 50,
				'corner': 25,
				'crossroads': 10,
				'tjunction': 10,
			})
		
			.put(4, 1, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(5, 5, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['honey']))
			.put(1, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(2, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(7, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(8, 0, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(3, 1, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(4, 2, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(0, 3, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(5, 3, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(6, 3, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(2, 4, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(7, 4, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(6, 5, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(5, 6, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(4, 6, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(1, 7, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(3, 7, 0, new Tile(TILE_TYPE['wall'], 		 TILE_ELEMENT['none']))
			.put(2, 1, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(6, 4, 0, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(7, 5, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(6, 9, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
			.put(3, 0, 2, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
			.put(9, 0, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
			.put(3, 2, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
			.put(7, 6, 3, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['honey']))
					
	]), // ======================================================================
			
	new Stage("Bereich E", [
	            
			new Level(5, 5, "Level 1", {
				// ???
			})
		
			.put(2, 2, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 4, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(4, 2, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(5, 3, "Level 2", {
				'straight': TILE_AMOUNT_ENDLESS,
				'corner': TILE_AMOUNT_ENDLESS,
				'crossroads': TILE_AMOUNT_ENDLESS,
				'tjunction': TILE_AMOUNT_ENDLESS,
			})
		
			.put(0, 1, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 2, 0, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(4, 2, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(5, 5, "Level 3", {
				// keine
			})
		
			.put(2, 0, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 4, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(4, 2, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
		, // ======================================================================
		
			new Level(5, 5, "Level 4", {
				'straight': TILE_AMOUNT_ENDLESS,
				'corner': TILE_AMOUNT_ENDLESS,
				'crossroads': TILE_AMOUNT_ENDLESS,
				'tjunction': TILE_AMOUNT_ENDLESS,
			})
		
			.put(2, 4, 0, new Tile(TILE_TYPE['source'], 		 TILE_ELEMENT['lava']))
			.put(0, 4, 2, new Tile(TILE_TYPE['source'],		 TILE_ELEMENT['lava']))
			.put(4, 2, 1, new Tile(TILE_TYPE['destination'],	 TILE_ELEMENT['lava']))
		
	]) // ======================================================================
				
]);

function getStages() {
	return serializer.resurrect(sessionStorage["stages"]);
}
