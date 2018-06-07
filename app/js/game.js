// Function Fix for "requestAnimationFrame" 12.06.17
// IIFE
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
				|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					},
					timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());


class GameRunner {
	constructor() {
		let me = this;
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;
		me.background = new Background();
		me.biker = new Biker();
		me.initializeTrail();
		me.obstacles = new Obstacles();
		me.init()
	}

	start() {
		let me = this;
		if (!me.isRunning) {
			me.isRunning = true;
			me.startEventHandler();
			me.moveObstacles();
			me.gameOverHandler();
		}
	}

	init() {
		this.startEventHandler();
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
			if (e.keyCode === 32 || e.keyCode === 38) {
				me.start()
			}
		};
		if (!me.handler){
			me.handler = handlerFunc.bind(me);
		}

		if (!me.isRunning) {
			window.addEventListener('keydown', me.handler);
		} else {
			window.removeEventListener('keydown', me.handler);
		}
	}

	initializeTrail(){
		this.trail = new Trail();
	}

	moveObstacles() {
		let me = this;
		me.points++;
		me.currentSpeed += me.acceleration;
		me.trail.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);
		me.background.move();
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