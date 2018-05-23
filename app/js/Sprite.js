// TODO
// make basic sprite



class Sprite {
	constructor(options) {
		let me = this;
		me.copyOptions(options);

		me.isMoving = false;
		me.stepLength = 0;
		me.frameIndex = 0;
		me.tick = 0;
	}

	copyOptions(options){
		let me = this;
		me.canvas = options.canvas;
		me.image = new Image();
		me.image.src = options.imageSrc;
		me.direction = options.initialDirection;
		me.width = options.width;
		me.height = options.height;
		me.animations = options.animations;
		me.ticksPerFrame = options.ticksPerFrame;
		me.numberOfFrames = options.numberOfFrames;
		me.cPos = options.initialPosition;
		me.lPos = me.cPos;
	}

	render() {
		let me = this,
				context = me.canvas.getContext('2d');

		context.clearRect(
				me.lPos.x,
				me.lPos.y,
				me.width,
				me.height);

		me.lPos = me.cPos;

		context.drawImage(
				me.image,
				me.frameIndex * me.width,
				me.direction * me.height,
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
			me.tick = 0;

			// update frame number
			me.frameIndex = me.frameIndex < (me.numberOfFrames - 1) ? (me.frameIndex + 1) : 0;

			switch (true) {
				case (me.direction === me.animations.down):
					me.cPos.y = me.cPos.y > me.canvas.height - me.height - me.stepLength ?
							me.canvas.height - me.height : me.cPos.y + me.stepLength;
					break;
				case (me.direction === me.animations.up):
					me.cPos.y = me.cPos.y < me.stepLength ? 0 : me.cPos.y - me.stepLength;
					break;
				case (me.direction === me.animations.left):
					if (me.canMove()) {
						me.cPos.x = me.cPos.x < me.stepLength ? 0 : me.cPos.x - me.stepLength;
					}
					break;
				case (me.direction === me.animations.right):
					if (me.canMove()) {
						me.cPos.x = me.cPos.x > me.canvas.width - me.width - me.stepLength ?
								me.canvas.width - me.width : me.cPos.x + me.stepLength;
					}

					break;
			}
			me.render();
		}
		if (me.isMoving) {
			window.requestAnimationFrame(function () {
				me.update();
			});
		} else {
			window.requestAnimationFrame(function () {
				me.tick = 0;
				me.frameIndex = 0;
				me.render();
			})
		}
	}

	canMove() {
		let me = this,
				width = me.width,
				height = me.height,
				step = me.stepLength,
				x = me.cPos.x,
				y = me.cPos.y + height - width / 2,
				can = false;
		switch (true) {
			case (me.direction === me.animations.right):
				can = background.getCollisionAtPoint(x + width + step, y);
				break;
			case (me.direction === me.animations.up):
				can = background.getCollisionAtPoint();
				break;
			case (me.direction === me.animations.left):
				can = background.getCollisionAtPoint(x - step, y);
				break;
			case (me.direction === me.animations.right):
				can = background.getCollisionAtPoint();
				break;
			default:
				//do nothing
		}
		return !can;
	}

	move(direction) {
		let me = this;
		me.isMoving = true;
		me.frameIndex = 0;
		me.direction = me.animations[direction];

		me.update();
	}

	stopMoving() {
		let me = this;
		me.isMoving = false;
		me.frameIndex = 0;
		window.requestAnimationFrame(function () {
			me.update();
		});
	}
}