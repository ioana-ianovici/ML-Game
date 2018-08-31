export default class AIControls {
	constructor() {
		this.restart = false;
		this.autostart = false;
		if (this.autostart){
			setTimeout(this.start.bind(this), 1500);
		}
	}

	evaluate() {
		let closest = this.getClosest();
		let distance = closest.distance, //distance to the closest obstacle
				flying = closest.flying, //the type of the closest obstacle
				speed = game.currentSpeed;
		if (AI && this.autostart){
			AI.decide(distance, flying, speed)
		}
	}

	jump() {
		this.simulateKeyEvent(38);
		setTimeout(() => {
			this.simulateKeyEvent(38, "up")
		}, 50)
	}

	duck() {
		this.simulateKeyEvent(40);
	}

	unduck() {
		this.simulateKeyEvent(40, 'up');
	}

	getClosest() {
		let me = game.obstacles,
				positions = [],
				obstacles = [];

		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i,
					pos;

			pos = me[obstacleName].cPos.x;
			obstacles.push(me[obstacleName]);
			positions.push(pos)
		}

		let distance = Math.min(...positions);
		let obs = obstacles.find(el => el.cPos.x === Math.min(...positions)),
				flying = !!obs.speed;

		return {distance, flying}
	};

	start() {
		this.jump();
		// setTimeout(this.duck.bind(this), 1000);
		// setTimeout(this.unduck.bind(this), 2000);
	}

	simulateKeyEvent(keyCode, type) {
		let e = document.createEvent("HTMLEvents"),
				eventName = (typeof(type) === "string") ? "key" + type : "keydown";

		e.initEvent(eventName, true, true);
		e.keyCode = keyCode;

		document.dispatchEvent(e);
	}
}
