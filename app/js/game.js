class GameRunner {
	constructor() {
		let me = this;
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;

		me.background = new Background();
		me.obstacles = new Obstacles();
		me.biker = new Biker();
		me.addStartHandler();
	}

	start() {
		let me = this;
		if (!me.isRunning) {
			me.isRunning = true;
			me.gameOverHandler();
			me.moveObstacles();
		}
	}

	gameOverHandler(){
		let me = this;
		let handler = function (e) {
			if (e.keyCode === 81) {
				me.gameOver();
			}
		};
		handler.bind(me);
		window.addEventListener('keydown', handler)
	}

	addStartHandler(){
		let me = this;
		let handler = function (){
			me.start();
		};
		handler.bind(me);
		window.addEventListener('keydown', handler);
		window.addEventListener('touchstart', handler);
	}

	moveObstacles() {
		let me = this;

		me.points++;
		me.currentSpeed += me.acceleration;

		me.background.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);

		me.animID = window.requestAnimationFrame(function () {
			me.moveObstacles();
		});
	}

	gameOver() {
		console.log('game over');
		window.cancelAnimationFrame(this.animID);
		this.biker.animate('crash');
	}
}

let game = new GameRunner();