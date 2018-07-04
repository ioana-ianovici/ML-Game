import Trail from './Trail'
import Sky from './Sky'
import Biker from './Biker'
import Obstacles from './Obstacles'
import ScoreDisplay from "./ScoreDisplay";

export default class GameRunner {
	constructor() {
		let me = this;
		me.currentStatus = 'idle';
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;

		me.trail = new Trail();
		me.sky = new Sky();
		me.obstacles = new Obstacles();
		me.biker = new Biker();
		me.score = new ScoreDisplay();
		me.loadElements();
		me.addHandlers();
	}

	loadElements() {
		let me = this;
		window.addEventListener("load", function () {
			me.sky.move();
			me.obstacles.reDraw();
			me.trail.reDraw();
			me.biker.draw();
			me.biker.reDraw();
			me.score.display();
		});
	}

	processHandlers(e) {
		let me = this;

		if (e.type === 'keydown'){
			switch (e.keyCode) {
				case 38:
				case 32:
					if (me.biker.jumping){
						me.biker.desiredAction = 'jump';
					}
					break;
				case 40:
					if (me.biker.jumping){
						me.biker.desiredAction = 'duck';
					}
			}
		} else if (e.type === 'keyup'){
			me.biker.desiredAction = null;
		}


		if (e.repeat) {
			return
		}


		if (e.type === 'keydown') {
			e.preventDefault();
			// console.log(e.type, e.keyCode);
			switch (e.keyCode) {
				case 38:
				case 32:
					if (me.currentStatus === 'idle') {
						me.startGame();
					}
					me.biker.jump();
					break;
				case 81:
					if (me.currentStatus === 'running') {
						me.biker.crashDown();
						me.gameOver();
					}
					break;
				case 87:
					if (me.currentStatus === 'running') {
						me.biker.crashUp();
						me.gameOver();
					}
					break;
				case 40:
					if (me.currentStatus === 'running' && !me.biker.jumping) {
						me.biker.duck();
					}
			}
		} else if (e.type === 'keyup') {
			if (e.keyCode === 38 || e.keyCode === 32) {
				if (me.currentStatus === 'crash') {
					me.startGame();
				}
			} else if (e.keyCode === 40 && me.currentStatus === 'running' && (me.biker.action === 'ducking' || me.biker.action === 'duck')) {
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

	startGame(){
		let me = this;

		me.currentSpeed = 4;
		me.points = 0;
		me.obstacles = new Obstacles();
		me.runGame();
	}

	runGame() {
		let me = this;
		me.currentStatus = 'running';
		me.points++;
		// console.log(me.points);
		me.score.showScore(parseInt(me.points/10));
		me.currentSpeed += me.acceleration;

		me.trail.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);

		me.animID = window.requestAnimationFrame(function () {
			me.runGame();
		});
	}

	gameOver() {
		let me = this;
		me.currentStatus = 'crash';
		window.cancelAnimationFrame(this.animID);
	}
}
