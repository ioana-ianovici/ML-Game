class Sprite {
	constructor(options) {
		let me = this;
		me.canvas = options.canvas;
		me.image = new Image();
		me.image.src = options.imageSrc;
		me.origin = options.origin;
		me.width = options.width;
		me.height = options.height;

		me.cPos = options.initialPosition;
		me.lPos = {};
		me.initPos = {};
		me.initPos.x = me.cPos.x;
		me.initPos.y = me.cPos.y;
		me.lPos.x = me.cPos.x;
		me.lPos.y = me.cPos.y;
	}

	render() {
		this.clear();
		this.draw();
	}

	clear(){
		let me = this,
				context = me.canvas.getContext('2d');

		// remove the image from last position
		context.clearRect(
				me.lPos.x,
				me.lPos.y,
				me.width,
				me.height);

		// update the last position
		me.lPos.x = me.cPos.x;
		me.lPos.y = me.cPos.y;
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