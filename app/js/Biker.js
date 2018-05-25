class Biker extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: "app/img/biker_spritesheet_2.png",
			width: 200,
			height: 200,
			initialPosition: {
				x: 0,
				y: 150
			}
		});

		let me = this;
		me.animations = {
			wait: {
				numberOfFrames: 1,
				ticksPerFrame: 60,
				frameRow: 0
			},
			ride: {
				numberOfFrames: 8,
				ticksPerFrame: 4,
				frameRow: 0
			},
			jump: {
				numberOfFrames: 4,
                ticksPerFrame: 7,
				frameProps: [{index: 0}, {index: 1}, {index: 1}, {index: 1}, {index: 2}, {index: 2}, {index: 2}, {index: 3}],
				frameRow: 1,
				noRepeat: true
			},
			duck: {
				numberOfFrames: 2,
				ticksPerFrame: 4,
				frameRow: 2,
				noRepeat: true
			},
			unDuck: {
				numberOfFrames: 2,
				ticksPerFrame: 4,
				frameRow: 2,
				frameProps: [{index: 1}, {index: 0}],
				noRepeat: true
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
		document.addEventListener('keydown', function (e) {
			me.doWhatISay(e);
		});
		document.addEventListener('keyup', function (e) {
			me.doWhatISay(e);
		});
	}

	doWhatISay(e) {
		if (e.repeat) {
			return
		}

		let me = this;
		if (e.type === 'keydown') {
			if (e.keyCode === 38) {
				me.animate('jump');
			} else if (e.keyCode === 40) {
				me.animate('duck')
			} else if (e.keyCode === 37) {
				me.animate('crash');
			}
		} else {
			if (e.keyCode === 39){
				me.animate('wait');
			} else if (e.keyCode !== 37) {
				me.animate('ride');
			}
		}
	}
}