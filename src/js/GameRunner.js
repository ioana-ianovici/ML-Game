import Trail from './Trail'
import Sky from './Sky'
import Biker from './Biker'
import Obstacles from './Obstacles'
import ScoreDisplay from "./ScoreDisplay";
import Plane from "./Plane";

export default class GameRunner {
	constructor() {
		let me = this;
		me.currentStatus = 'idle';
		me.acceleration = 0.001;
		me.HIScore = 0;

		me.trail = new Trail();
		me.sky = new Sky();
		me.biker = new Biker();
		me.score = new ScoreDisplay();
		me.loadElements();
		me.addHandlers();
	}

	loadElements() {
		let me = this;
		window.addEventListener("load", () => {
			me.sky.move();
			me.trail.reDraw();
			me.biker.draw();
			me.biker.reDraw();
			me.score.showScore(0);
		});
	}

	processHandlers(e) {
		let me = this;

		if (e.type === 'keydown') {
			switch (e.keyCode) {
				case 38:
				case 32:
					if (me.biker.jumping) {
						me.biker.desiredAction = 'jump';
					}
					break;
				case 40:
					if (me.biker.jumping) {
						me.biker.desiredAction = 'duck';
					}
			}
		} else if (e.type === 'keyup') {
			me.biker.desiredAction = null;
		}


		if (e.repeat) {
			return
		}


		if (e.type === 'keydown') {
			// console.log(e.type, e.keyCode);
			switch (e.keyCode) {
				case 38:
				case 32:
					e.preventDefault();
					if (me.currentStatus === 'idle') {
						me.startGame();
					}
					me.biker.jump();
					break;
				case 81:
					e.preventDefault();
					if (me.currentStatus === 'running') {
						me.biker.crashDown();
						me.gameOver();
					}
					break;
				case 87:
					e.preventDefault();
					if (me.currentStatus === 'running') {
						me.biker.crashUp();
						me.gameOver();
					}
					break;
				case 40:
					e.preventDefault();
					if (me.currentStatus === 'running' && !me.biker.jumping) {
						me.biker.duck();
					}
			}
		} else if (e.type === 'keyup') {
			if (e.keyCode === 38 || e.keyCode === 32) {
				if (me.currentStatus === 'crash') {
					e.preventDefault();
					me.startGame();
				}
			} else if (e.keyCode === 40 && me.currentStatus === 'running' && (me.biker.action === 'ducking' || me.biker.action === 'duck')) {
				e.preventDefault();
				me.biker.unduck();
			}
		} else if (e.type === 'touchstart') {
			if (me.currentStatus === 'idle') {
				me.startGame();
			}
			me.biker.jump();
		}

	}

	addHandlers() {
		let handler = this.processHandlers.bind(this);
		window.addEventListener('keydown', handler);
		window.addEventListener('keyup', handler);
		window.addEventListener('touchstart', handler);
	}

	startGame() {
		let me = this;

		me.currentStatus = 'running';
		me.clearAll();
		if (me.HIScore > 0) {
			me.score.showHIScore(me.HIScore);
		}
		me.currentSpeed = 4;
		me.points = 0;
		me.obstacles = new Obstacles();
		me.runGame();
	}

	clearAll() {
		let canvas = document.getElementById("biker-layer");
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
	}

	runGame() {
		let me = this;

		if (me.checkCollision()) {
			return
		}

		me.currentSpeed += me.acceleration;
		me.points += me.currentSpeed;
		me.score.showScore(parseInt(me.points / 50));

		me.trail.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);

		me.animID = window.requestAnimationFrame(() => me.runGame());
	}

	checkCollision() {
		let me = this,
				biker = me.biker,
				obstacle = null,
				square = {};

		for (let i = 0; i < me.obstacles.obstaclesNumber; i++) {
			let obs = me.obstacles['obstacle_' + (i + 1)];
			// check if any obstacle enters biker sprite area
			if (obs.cPos.x < biker.cPos.x + biker.width && obs.cPos.x + obs.width > biker.cPos.x) {
				obstacle = obs;
				// select intersection square
				square = {
					x: Math.floor(Math.max(obs.cPos.x, biker.cPos.x)),
					y: Math.floor(Math.max(obs.cPos.y, biker.cPos.y)),
					w: Math.min(Math.ceil(obstacle.cPos.x < biker.cPos.x ? obstacle.width - Math.abs(obstacle.cPos.x - biker.cPos.x) : biker.width - Math.abs(obstacle.cPos.x - biker.cPos.x)), obstacle.width, biker.width),
					h: Math.min(obstacle.cPos.y < biker.cPos.y ? obstacle.height - Math.abs(obs.cPos.y - biker.cPos.y) : biker.height - Math.abs(obstacle.cPos.y - biker.cPos.y), obstacle.height, biker.height)
				};
			}
		}

		if (obstacle && square.w > 0 && square.h > 0) {
			let img1 = biker.canvas.getContext('2d').getImageData(square.x, square.y, square.w, square.h),
					img2 = obstacle.canvas.getContext('2d').getImageData(square.x, square.y, square.w, square.h);
			for (let i = 0; i < img1.data.length; i++) {
				// check if the images are nontransparent at any given pixel on both sprites: biker and obstacle
				if (img1.data[i] > 0 && img2.data[i] > 0) {
					if (obstacle instanceof Plane) {
						me.biker.crashUp();
					} else {
						me.biker.crashDown();
					}
					me.gameOver();
					return true
				}
			}
		}

	}

	gameOver() {
		let me = this,
				score = Math.floor(me.points / 50);

		me.currentStatus = 'crash';
		me.score.showGameOver();

		if (score > me.HIScore) {
			me.HIScore = score;
		}

		// quick fix to remove obstacles at game over
		// let canvas = document.getElementById("obstacle-layer");
		// canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		window.cancelAnimationFrame(me.animID);
	}
}
