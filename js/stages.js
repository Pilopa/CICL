//=== Stages ===

if (typeof sessionStorage["stages"] === 'undefined') sessionStorage["stages"] = 
	hydrate.stringify([new Stage([new Level(10, 10, "Einführung", {
					straight: TILE_AMOUNT_ENDLESS,
					corner: TILE_AMOUNT_ENDLESS,
					straight: TILE_AMOUNT_ENDLESS,
					tjunction:TILE_AMOUNT_ENDLESS,
					crossroads:TILE_AMOUNT_ENDLESS
				})
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_ACID))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_ACID)),
				
				new Level(5, 5, "Level 2")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(5, 5, "Level 1")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(5, 5, "Level 1")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),

	new Stage([new Level(5, 5, "Level 1")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(5, 5, "Level 1")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))])
				
]);

function getStages() {
	return hydrate.parse(sessionStorage["stages"]);
}