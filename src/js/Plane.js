import Sprite from './Sprite'

export default class Plane extends Sprite {
	constructor(x) {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "src/img/environment_sheet.png",
			width: 100,
			height: 40,
			origin: {x: 0, y: 88},
			pos: {
				x,
				y: 132
			}
		});

		let me = this;
		me.frameNum = 2;
		me.frameIndex = 0;
		me.tpf = 10;
		me.tick = 0;
	}

	draw() {
		let me = this;
		me.tick++;
		if (me.tick >= me.tpf) {
			me.tick = 0;
			me.switchFrame()
		}
		super.draw();
	}

	switchFrame() {
		let me = this;
		me.frameIndex = me.frameIndex >= me.frameNum - 1 ? 0 : me.frameIndex + 1;
		me.origin.x = me.frameIndex * me.width;
	}
}
