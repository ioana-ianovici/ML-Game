import Trail from './Trail'
import Sky from './Sky'
import Biker from './Biker'
import Obstacles from './Obstacles'

export default class GameRunner {
	constructor() {
		let me = this;
		me.currentStatus = 'idle';
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;

		this.trail = new Trail();
		this.sky = new Sky();
		me.obstacles = new Obstacles();
		me.biker = new Biker();
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
		});
	}

	processHandlers(e) {

		if (e.repeat) {
			return
		}
		let me = this;
		if (e.type === 'keydown') {
			e.preventDefault();
			// console.log(e.type, e.keyCode);
			switch (e.keyCode) {
				case 38:
					if (me.currentStatus === 'idle') {
						me.run();
					}
					me.biker.jump();
					break;
				case 32:
					if (me.currentStatus === 'idle') {
						me.run();
					}
					me.biker.jump();
					break;
				case 81:
					me.biker.crashDown();
					me.gameOver();
					break;
				case 87:
					me.biker.crashUp();
					me.gameOver();
					break;
				case 40:
					me.biker.duck();
					break;
				case 66:
					me.biker.ride();
			}
		} else if (e.type === 'keyup') {
			if (e.keyCode === 38 || e.keyCode === 32) {
				if (me.currentStatus === 'crash') {
					me.run();
				}
			} else if (e.keyCode === 40){
				me.biker.unduck();
			}
		} else if (e.type === 'touchstart') {
			if (me.currentStatus === 'idle') {
				me.run();
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

	run() {
		let me = this;
		me.currentStatus = 'running';
		me.points++;
		me.currentSpeed += me.acceleration;

		me.trail.move(me.currentSpeed);
		me.obstacles.move(me.currentSpeed);

		me.animID = window.requestAnimationFrame(function () {
			me.run();
		});
	}

	gameOver() {
		let me = this;
		me.currentStatus = 'crash';
		window.cancelAnimationFrame(this.animID);
	}
}
