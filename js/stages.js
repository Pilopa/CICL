//=== Stages ===

if (sessionStorage["stages"] === undefined) sessionStorage["stages"] = 
	hydrate.stringify([new Stage([new Level(6, 6, "Einführung", {
					straight: TILE_AMOUNT_ENDLESS,
					corner: TILE_AMOUNT_ENDLESS,
					straight: TILE_AMOUNT_ENDLESS,
					crossroads: 99
				})
				.put(0, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_ACID))
				.put(3, 3, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(4, 4, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_ACID))
				.put(5, 5, 0, new Tile(TILE_TYPE_WALL))
				.put(5, 4, 0, new Tile(TILE_TYPE_WALL))
				.put(5, 3, 0, new Tile(TILE_TYPE_WALL))
				.put(5, 2, 0, new Tile(TILE_TYPE_WALL))
				.put(5, 1, 0, new Tile(TILE_TYPE_WALL))
				.put(5, 0, 0, new Tile(TILE_TYPE_WALL))
				.put(0, 5, 0, new Tile(TILE_TYPE_WALL))
				.put(1, 5, 0, new Tile(TILE_TYPE_WALL))
				.put(2, 5, 0, new Tile(TILE_TYPE_WALL))
				.put(3, 5, 0, new Tile(TILE_TYPE_WALL))
				.put(4, 5, 0, new Tile(TILE_TYPE_WALL)),
				
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