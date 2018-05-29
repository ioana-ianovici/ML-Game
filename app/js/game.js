class GameRunner {
	constructor() {
		let me = this;
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;
		me.background = new Background();
		me.biker = new Biker();
		me.init()
	}

	start() {
		console.log('game started');
		let me = this;
		if (!me.isRunning) {
			me.isRunning = true;
			me.startEventHandler();
			me.obstacle = new Obstacle();
			me.moveObstacles();
		}
	}

	init() {
		this.startEventHandler();
	}

	startEventHandler() {
		let me = this;
		let handlerFunc = function (e) {
			if (e.keyCode === 32 || e.keyCode === 38) {
				me.start()
			}
		};
		let handler = handlerFunc.bind(me);

		if (!me.isRunning) {
			window.addEventListener('keydown', handler);
		} else {
			window.removeEventListener('keydown', handler);
			console.log('removed event handler')
		}
	}

	moveObstacles() {
		let me = this;
		me.points++;
		me.currentSpeed += me.acceleration;
		me.obstacle.render();
		me.obstacle.cPos.x = me.obstacle.cPos.x > -me.obstacle.width ? me.obstacle.cPos.x - me.currentSpeed : 1000;
		me.animID = window.requestAnimationFrame(function () {
			me.moveObstacles();
		});
	}

	gameOver() {
		window.cancelAnimationFrame(this.animID);
	}
}

let game = new GameRunner();

// game.start();