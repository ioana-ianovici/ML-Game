class GameRunner {
	constructor() {
		let me = this;
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;
		me.background = new Background();
		me.obstacles = new Obstacles();
		me.biker = new Biker();
		me.startEventHandler();
	}

	start() {
		let me = this;
		if (!me.isRunning) {
			me.isRunning = true;
			me.startEventHandler();
			me.gameOverHandler();
			me.moveObstacles();
		}
	}


	gameOverHandler(){
		let me = this;
		let handlerFunc = function (e) {
			if (e.keyCode === 81) {
				me.gameOver();
			}
		};
		me.GOHandler = handlerFunc.bind(me);
		window.addEventListener('keydown', me.GOHandler)
	}

	startEventHandler() {
		let me = this;
		let handlerFunc = function (e) {
			if (e.keyCode === 32 || e.keyCode === 38 || e.type === 'touchstart') {
				me.start()
			}
		};
		if (!me.handler){
			me.handler = handlerFunc.bind(me);
		}

		if (!me.isRunning) {
			window.addEventListener('keydown', me.handler);
			window.addEventListener('touchstart', me.handler);
		} else {
			window.removeEventListener('keydown', me.handler);
			window.removeEventListener('touchstart', me.handler);
		}
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