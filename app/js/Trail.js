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

		for (let i=1; i<=3; i++){
			let tileName = 'tile_' + i;
			// when the tile passes left side of the canvass it is repositioned at the right of the other tiles
			me[tileName].cPos.x = me[tileName].cPos.x <= -me.width ? me[tileName].cPos.x + me.width * 3 - distance : me[tileName].cPos.x - distance;
		}

		me.reDraw();
	}

	reDraw(){
		let me = this;

		me.tile_1.draw();
		me.tile_2.draw();
		me.tile_3.draw();
	}
}