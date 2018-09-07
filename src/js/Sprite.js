export default class Sprite {
	constructor(options) {
		let me = this;
		me.canvas = options.canvas;
		me.ctx = options.canvas.getContext('2d');
		me.image = new Image();
		me.image.src = options.imageSrc;
		me.origin = options.origin;
		me.width = options.width;
		me.height = options.height;

		me.pos = options.pos;
	}

	draw() {
		let me = this,
				// avoid rational positions to improve CPU work
				x = Math.floor(me.pos.x),
				y = Math.floor(me.pos.y);
		// console.log(x, y);

		me.ctx.drawImage(
				me.image,
				me.origin.x,
				me.origin.y,
				me.width,
				me.height,
				x,
				y,
				me.width,
				me.height
		);
	}
}
