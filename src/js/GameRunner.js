import Trail from './Trail'
import Sky from './Sky'
import Biker from './Biker'
import Obstacles from './Obstacles'
import ScoreDisplay from "./ScoreDisplay";
import Plane from "./Plane";
import {settings} from "./Settings";

export default class GameRunner {
	constructor() {
		let me = this;
		me.currentStatus = 'idle';
		me.acceleration = settings.acceleration;
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
			// me.sky.move();
			me.trail.reDraw();
			me.biker.draw();
			// me.biker.reDraw();
			me.score.showScore(0);
			me.runAnimation();
		});
	}

	runAnimation(){
		let me = this;
		me.sky.move();
		me.biker.reDraw();

		me.currentStatus === 'running' ? me.runGame() : 'do nothing';

		me.animID = window.requestAnimationFrame(()=>{me.runAnimation()})
	}

	processHandlers(e) {
		let me = this,
				biker = me.biker;

		if (e.repeat) {
			return
		}

		if (e.type === 'keydown') {
			switch (e.keyCode) {
				case 38:
				case 32:
					e.preventDefault();
					if (me.currentStatus === 'idle') {
						me.startGame();
					}
					if (me.currentStatus === 'running') {
						biker.jump();
						if (biker.jumping) {
							biker.desiredAction = 'jump';
						}
					}
					break;
				case 40:
					e.preventDefault();
					if (me.currentStatus === 'running' && !me.biker.jumping) {
						biker.duck();
					}
					if (biker.jumping) {
						biker.desiredAction = 'duck';
					}
			}
		} else if (e.type === 'keyup') {
			biker.desiredAction = null;
			if (e.keyCode === 40 && me.currentStatus === 'running' && (me.biker.action === 'ducking' || me.biker.action === 'duck')) {
				e.preventDefault();
				biker.unduck();
			}
		} else if (e.type === 'touchstart') {
			if (me.currentStatus === 'idle') {
				me.startGame();
			}
			biker.jump();
		}
	}

	addHandlers() {
		let handler = this.processHandlers.bind(this);
		window.addEventListener('keydown', handler);
		window.addEventListener('keyup', handler);
		window.addEventListener('touchstart', handler);
	}

	startGame() {
		let me = this,
				canvas = document.getElementById("biker-layer");

		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		me.currentStatus = 'running';
		// me.clearAll();
		if (me.HIScore > 0) {
			me.score.showHIScore(me.HIScore);
		}
		me.currentSpeed = settings.initialSpeed;
		me.points = 0;
		me.obstacles = new Obstacles();
		// me.runGame();
	}

	// the recurrent game logic
	runGame() {
		let me = this;

		// if (me.checkCollision()) return;

		me.currentSpeed += me.acceleration;
		me.points += me.currentSpeed / 50;
		me.score.showScore(parseInt(me.points));

		me.trail.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);

		AICtrl.evaluate();
		// me.animID = window.requestAnimationFrame(() => me.runGame());
	}

	checkCollision() {
		let me = this,
				biker = me.biker;

		for (let i = 0; i < me.obstacles.obstaclesNumber; i++) {
			let obstacle = me.obstacles['obstacle_' + (i + 1)],
					bx = biker.pos.x,
					ox = obstacle.pos.x,
					by = biker.pos.y,
					oy = obstacle.pos.y,
					bw = biker.width,
					ow = obstacle.width,
					bh = biker.height,
					oh = obstacle.height;

			// check if any obstacle enters biker sprite area
			if (ox < bx + bw && ox + ow > bx) {
				let square = {
					x: Math.floor(Math.max(ox, bx)),
					y: Math.floor(Math.max(oy, by)),
					w: Math.min(Math.ceil(ox < bx ? ow - Math.abs(ox - bx) : bw - Math.abs(ox - bx)), ow, bw),
					h: Math.min(oy < by ? oh - Math.abs(oy - by) : bh - Math.abs(oy - by), oh, bh)
				};

				if (square.h < 1 || square.w < 1) continue;

				let img1 = biker.canvas.getContext('2d').getImageData(square.x, square.y, square.w, square.h),
						img2 = obstacle.canvas.getContext('2d').getImageData(square.x, square.y, square.w, square.h);

				// iterate the alpha element of every 16'th pixel in the square
				for (let i = 3; i < img1.data.length; i += 64) {
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
	}

	gameOver() {
		let me = this,
				score = Math.floor(me.points);

		me.currentStatus = 'crash';

		// update HI score
		if (score > me.HIScore) {
			me.HIScore = score;
			me.score.showHIScore(me.HIScore);
		}

		// set a timeout to prevent instant game restart
		setTimeout(() => {
			me.currentStatus = 'idle';
			if (AICtrl.restart){
				AICtrl.start();
			}
		}, settings.game_over_delay);

		// diplay game over text
		me.score.gameOver();

		// quick fix to remove obstacles at game over
		let canvas = document.getElementById("obstacle-layer");
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		// stop the recurrence through this.runGame()
		// window.cancelAnimationFrame(me.animID);
	}
}
