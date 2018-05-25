class Sprite {
	constructor(options) {
		let me = this;
		me.canvas = options.canvas;
		me.image = new Image();
		me.image.src = options.imageSrc;
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

		console.log(me.frameIndex, me.framePropsIndex);

		// draw the image on the new position
		context.drawImage(
				me.image,
				me.frameIndex * me.width,
				me.frameRow * me.height,
				me.width,
				me.height,
				me.cPos.x,
				me.cPos.y,
				me.width,
				me.height
		);
	}

	update() {
		let me = this;
		me.tick++;
		if (me.tick > me.ticksPerFrame) {
			me.render();
			me.tick = 0;

			if (me.frameProps) {
				if (me.noRepeat) {
					if (me.framePropsIndex < me.frameProps.length - 1){
						me.framePropsIndex ++;
						me.cPos.y = me.cPos.y + me.frameProps[me.framePropsIndex].dy;
					} else {
						me.animate(me.nextAction);
						return
					}
				} else {
					me.framePropsIndex = me.framePropsIndex < me.frameProps.length - 1 ? me.framePropsIndex + 1 : 0;
				}
				me.frameIndex = me.frameProps[me.framePropsIndex].index;
			} else {
				if (me.noRepeat) {
					me.frameIndex = me.frameIndex < (me.numberOfFrames - 1) ? (me.frameIndex + 1) : (me.numberOfFrames - 1);
				} else {
					me.frameIndex = me.frameIndex < (me.numberOfFrames - 1) ? (me.frameIndex + 1) : 0;
				}
			}
		}

		if (me.action !== 'wait') {
			window.cancelAnimationFrame(me.animID);
			me.animID = window.requestAnimationFrame(function () {
				me.update();
			})
		} else {
			me.render();
		}
	}

	animate(action) {
		let me = this;

		if (me.frameProps && (me.framePropsIndex < me.frameProps.length - 1)) {
			return
		}

		me.action = action;
		me.tick = 0;
		me.frameIndex = 0;
		me.ticksPerFrame = me.animations[action].ticksPerFrame;
		me.numberOfFrames = me.animations[action].numberOfFrames;
		me.frameRow = me.animations[action].frameRow;
		me.noRepeat = me.animations[action].noRepeat;
		me.frameProps = me.animations[action].frameProps;
		if (me.frameProps) {
			me.framePropsIndex = 0;
			me.frameIndex = me.frameProps[0].index;
		}
		me.update();
	}
}