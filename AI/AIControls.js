export default class AIControls {
	constructor(AItype) {
		let me = this;
		me.AI = new AItype();
		me.isON = true;
		me.restart = true;
		if (me.isON) {
			setTimeout(me.start.bind(me), 1000);
		}
	}

	evaluate() {
		let me = this;
		if (me.isON) {
			if (game.state === "idle" && me.restart) {
				me.jump()
			} else {
				let closest = me.getClosest();
				let distance = closest.distance, //distance to the closest obstacle
						flying = closest.flying, //the type of the closest obstacle: true if is flying and false if it's not
						speed = game.currentSpeed;

				switch (this.AI.decide(distance, flying, speed)) {
					case 'jump':
						me.jump();
						break;
					case 'duck':
						me.duck();
						break;
					case 'unduck':
						me.unduck();
						break;
				}
			}
		}
		requestAnimationFrame(me.evaluate.bind(me))
	}

	jump() {
		this.simulateKeyEvent(38);
		setTimeout(() => {
			this.simulateKeyEvent(38, "up")
		}, 50)
	}

	duck() {
		if (!this.ducking) {
			this.simulateKeyEvent(40);
			this.ducking = true
		}

	}

	unduck() {
		if (this.ducking) {
			this.simulateKeyEvent(40, 'up');
			this.ducking = false
		}
	}

	getClosest() {
		let obs = game.obstacles,
				positions = [],
				obstacles = [];

		for (let i = 1; i <= obs.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i,
					pos;

			pos = obs[obstacleName].pos.x;
			obstacles.push(obs[obstacleName]);
			positions.push(pos)
		}

		let distance = Math.min(...positions);
		let first = obstacles.find(el => el.pos.x === Math.min(...positions)),
				flying = !!first.speed;

		return {distance, flying}
	};

	start() {
		let me = this;
		me.jump();
		requestAnimationFrame(me.evaluate.bind(me));
	}

	simulateKeyEvent(keyCode, type) {
		let e = document.createEvent("HTMLEvents"),
				eventName = (typeof(type) === "string") ? "key" + type : "keydown";

		e.initEvent(eventName, true, true);
		e.keyCode = keyCode;

		document.dispatchEvent(e);
	}
}
