class Trail {
	constructor() {
		let me = this;
		me.width = 512;
		me.tile_1 = new TrailTile(0);
		me.tile_2 = new TrailTile(me.width);
		me.tile_3 = new TrailTile(2 * me.width);

		window.addEventListener("load", function () {
			me.reDraw();
		});
	}

	move(distance){
		let me = this;

		// when the tile passes left side of the canvass it is repositioned at the right of the other tiles
		me.tile_1.cPos.x = me.tile_1.cPos.x <= - me.width ? (me.tile_1.cPos.x + me.width * 3 - distance) : me.tile_1.cPos.x - distance;
		me.tile_2.cPos.x = me.tile_2.cPos.x <= - me.width ? (me.tile_2.cPos.x + me.width * 3 - distance) : me.tile_2.cPos.x - distance;
		me.tile_3.cPos.x = me.tile_3.cPos.x <= - me.width ? (me.tile_3.cPos.x +  me.width * 3 - distance) : me.tile_3.cPos.x - distance;

		me.reDraw();
	}

	reDraw(){
		let me = this;
		// below function will update tiles in their order from left to right
		[{obj:me.tile_1, index: 1, pos: me.tile_1.cPos.x}, {obj:me.tile_2, index: 2, pos: me.tile_2.cPos.x}, {obj:me.tile_3, index: 3, pos: me.tile_3.cPos.x}].sort((prev, curr) => {
			return prev.pos < curr.pos ? -1 : 1;
		}).map((tile) => {
			tile.obj.render();
			return tile.index;
		});
	}
}