class Obstacle extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/rock.png",
			width: 100,
			height: 134,
			initialPosition: {
				x: 800,
				y: 250
			}
		});

		let me = this;
		me.animations = {
			wait: {
				numberOfFrames: 1,
				ticksPerFrame: 60,
				frameRow: 0
			},
			crash: {
				numberOfFrames: 5,
				ticksPerFrame: 7,
				frameRow: 3,
				noRepeat: true
			}
		};

		me.initialize();
	}

	initialize() {
		let me = this;
		window.addEventListener("load", function () {
			me.animate('wait');
		});
	}

}