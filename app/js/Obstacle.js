class Obstacle extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 100,
			height: 134,
			initialPosition: {
				x: 1000,
				y: 300
			}
		});

		let me = this;
		me.animations = {
			wait: {
				numberOfFrames: 1,
				ticksPerFrame: 60,
				frameRow: 0
			}
		};

		me.initialize();
	}

	initialize() {
		let me = this;
		window.addEventListener("load", function () {
			me.render();
		});
	}

}