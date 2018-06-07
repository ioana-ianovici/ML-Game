class Sky {
	constructor() {
		let me = this;
		me.width = 128;
		me.cloudsNumber = 6;
		me.generateClouds();

		window.addEventListener("load", function () {
			me.reDraw();
		});
	}

	generateClouds() {
		let me = this;
		for (let i = 1; i <= me.cloudsNumber; i++) {
			let cloudName = 'cloud_' + i;
			me[cloudName] = new Cloud(randomNumber(0, 850), randomNumber(0, 120), randomNumber(10, 20) / 10);
		}
	}

	move() {
		let me = this;

		for (let i = 1; i <= me.cloudsNumber; i++) {
			let cloudName = 'cloud_' + i;
			if (me[cloudName].cPos.x < -me.width) {
				me[cloudName] = new Cloud(randomNumber(1000, 1200), randomNumber(0, 120), randomNumber(10, 20) / 10);
			} else {
				me[cloudName].cPos.x = me[cloudName].cPos.x - me[cloudName].speed;
			}
		}

		me.reDraw();
	}

	reDraw() {
		document.getElementById("background-layer").getContext('2d').clearRect(0, 0, 1000, 260);
		for (let i = 1; i <= this.cloudsNumber; i++) {
			let cloudName = 'cloud_' + i;
			this[cloudName].draw();
		}
	}
}