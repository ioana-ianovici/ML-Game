class Sprite {
	constructor(options) {
		let me = this;
		me.canvas = options.canvas;
		me.image = new Image();
		me.image.src = options.imageSrc;
		me.origin = options.origin;
		me.width = options.width;
		me.height = options.height;

		me.cPos = options.pos;
	}

	draw(){
		let me = this,
				context = me.canvas.getContext('2d');

		// draw the image on the new position
		context.drawImage(
				me.image,
				me.origin.x,
				me.origin.y,
				me.width,
				me.height,
				me.cPos.x,
				me.cPos.y,
				me.width,
				me.height
		);
	}
}