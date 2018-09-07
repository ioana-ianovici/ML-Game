import TrailTile from './TrailTile'

export default class Trail {
	constructor() {
		let me = this;
		me.width = 512;
		me.tile_1 = new TrailTile(0);
		me.tile_2 = new TrailTile(me.width);
		me.tile_3 = new TrailTile(2 * me.width);
	}

	move(distance){
		let me = this;

		for (let i=1; i<=3; i++){
			const tile = me['tile_' + i];
			const xPos = tile.pos.x;
			tile.pos.x = xPos <= -me.width ? xPos + me.width * 3 - distance : xPos - distance;
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