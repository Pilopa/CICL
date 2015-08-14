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
				
				new Level(5, 4, "Level 2", {
					'straight': 6,
					'corner': 8,
				})
				.put(0, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 0, 0, new Tile(TILE_TYPE_WALL,			 TILE_ELEMENT_NONE))
				.put(1, 0, 0, new Tile(TILE_TYPE_WALL,			 TILE_ELEMENT_NONE))
				.put(2, 1, 0, new Tile(TILE_TYPE_WALL,			 TILE_ELEMENT_NONE))
				.put(3, 2, 0, new Tile(TILE_TYPE_WALL,			 TILE_ELEMENT_NONE))
				.put(2, 0, 2, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 4, "Level 3", {
					'straight': 10,
					'corner': 6,
				})
				.put(4, 0, 1, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(3, 1, 1, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(3, 0, 0, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(1, 2, 2, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(6, 5, "Level 4", {
					'straight': 10,
					'corner': 10,
				})
				.put(0, 3, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(2, 1, 1, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(3, 2, 0, new Tile(TILE_TYPE_WALL,			 TILE_ELEMENT_NONE))
				.put(3, 1, 2, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(4, 3, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(3, 3, "Level 1")
				.put(0, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(1, 0, 1, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(2, 1, 0, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(1, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2", {
					'straight': TILE_AMOUNT_ENDLESS,
					'corner': TILE_AMOUNT_ENDLESS,
					'crossroads': TILE_AMOUNT_ENDLESS,
					'tjunction': TILE_AMOUNT_ENDLESS,
				})
				.put(0, 4, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(1, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(5, 5, "Level 1")
				.put(1, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2", {
					'straight': 6,
					'corner': 8,
					'crossroads': 1,
				})
				.put(1, 0, 1, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 2, 0, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_HONEY))
				.put(3, 3, 0, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(3, 0, 3, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_HONEY)),
				
				new Level(5, 5, "Level 3", {
					'straight': 3,
					'corner': 8,
					'crossroads': 1,
				})
				.put(0, 0, 1, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 3, 0, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_HONEY))
				.put(4, 3, 0, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))
				.put(3, 0, 3, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_HONEY)),
				
				new Level(5, 5, "Level 4")
				.put(1, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),

	new Stage([new Level(5, 5, "Level 1")
				.put(1, 4, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 2")
				.put(2, 0, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(2, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))]),
				
	new Stage([new Level(5, 5, "Level 1")
				.put(2, 2, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 3, "Level 2", {
					'straight': TILE_AMOUNT_ENDLESS,
					'corner': TILE_AMOUNT_ENDLESS,
					'crossroads': TILE_AMOUNT_ENDLESS,
					'tjunction': TILE_AMOUNT_ENDLESS,
				})
				.put(0, 1, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 2, 0, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA)),
				
				new Level(5, 5, "Level 3")
				.put(2, 4, 0, new Tile(TILE_TYPE_SOURCE, 		 TILE_ELEMENT_LAVA))
				.put(0, 4, 2, new Tile(TILE_TYPE_SOURCE,		 TILE_ELEMENT_LAVA))
				.put(4, 2, 1, new Tile(TILE_TYPE_DESTINATION,	 TILE_ELEMENT_LAVA))])
				
]);

function getStages() {
	return serializer.resurrect(sessionStorage["stages"]);
}