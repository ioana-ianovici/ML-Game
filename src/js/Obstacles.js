import {randomNumber, probability} from "./globalFunctions";
import Rock from './Rock'
import Plane from './Plane'

export default class Obstacles {
	constructor() {
		let me = this;
		me.obstaclesNumber = 5;
		me.generateObstacles();
	}

	generateObstacles() {
		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			this.createObstacle(obstacleName, 4);
		}
	}

	createObstacle(obstacleName, currentSpeed) {
		let me = this;
		const lastPos = me.findLast();

		if (probability(70)) {
			me[obstacleName] = new Rock(randomNumber(lastPos + 500, lastPos + 1000), randomNumber(1, 2));
		} else {
			let speed = randomNumber(1,10)/10;
			// let pos = (lastPos * speed / currentSpeed);
			// console.log('==',pos);
			me[obstacleName] = new Plane(speed, randomNumber(lastPos + 500, lastPos + 1000));
		}
	}

	move(distance) {
		let me = this;

		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let obstacle = me[obstacleName];

			if (obstacle.cPos.x < -obstacle.width) {
				this.createObstacle(obstacleName, distance)
			} else {
				if (obstacle instanceof Plane){
					obstacle.cPos.x = obstacle.cPos.x - distance - obstacle.speed;
				} else {
					obstacle.cPos.x = obstacle.cPos.x - distance;}
			}

		}

		me.reDraw();
	}

	findLast(){
		let array = [];
		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let pos;
			try {
				pos = this[obstacleName].cPos.x
			} catch (e) {
				pos = 1000
			}
			array.push(pos)
		}
		return Math.max(...array)
	}

	drawPositions(){
		let ctx = document.getElementById('obstacle-layer').getContext('2d');
		ctx.beginPath();
		// ctx.strokeStyle

		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let pos;
			try {
				pos = this[obstacleName].cPos.x;
			} catch (e) {
				pos = 1000
			}
			ctx.moveTo(20, 5 + 5 * i);
			ctx.lineTo(20 + pos /10, 5 + 5 * i);
			ctx.stroke();
		}
	}

	reDraw() {
		let canvas = document.getElementById("obstacle-layer");

		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			this[obstacleName].draw();
		}
		this.drawPositions();
	}
}
