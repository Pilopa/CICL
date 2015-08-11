//=== Stages ===

if (sessionStorage["stages"] === undefined) sessionStorage["stages"] = 
	serializer.stringify([new Stage([new Level(5, 5, "Einführung", {})
				.put(4, 0, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(4, 1, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(4, 2, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(4, 3, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(4, 4, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(3, 0, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(3, 1, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(3, 2, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(3, 3, 0, new Tile(TILE_TYPE_WALL, false, false))
				.put(3, 4, 0, new Tile(TILE_TYPE_WALL, false, false)),
				
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
	return serializer.resurrect(sessionStorage["stages"]);
}