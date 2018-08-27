import {randomNumber, probability} from "./globalFunctions";
import Rock from './Rock'
import Plane from './Plane'
import {settings} from "./Settings";

export default class Obstacles {
	constructor() {
		let me = this;
		me.obstaclesNumber = settings.obstaclesNumber;
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
		let last = me.findLast();
		let lastPos = last.cPos.x;
		let pos = randomNumber(500, 1000);
		let planeAhead = last instanceof Plane;

		if (probability(settings.rockProbability)) {
			if (planeAhead){
				pos += lastPos * currentSpeed / (3 + currentSpeed);
			} else {
				pos += lastPos;
			}
			pos = pos < lastPos ? lastPos + 1 : pos;
			me[obstacleName] = new Rock(pos, randomNumber(1, 2));
		} else {
			if (planeAhead){
			    pos += lastPos;
			} else {
				pos += lastPos * (3 + currentSpeed) / currentSpeed; // this formula does not consider the game acceleration
			}
			me[obstacleName] = new Plane(pos);
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
				if (obstacle instanceof Plane) {
					obstacle.cPos.x = obstacle.cPos.x - distance - obstacle.speed;
				} else {
					obstacle.cPos.x = obstacle.cPos.x - distance;
				}
			}

		}

		me.reDraw();
	}

	findLast() {
		let me = this;
		let positions = [];
		let obstacles = [];
		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let pos;
			try {
				pos = me[obstacleName].cPos.x;
				obstacles.push(me[obstacleName])
			} catch (e) {
				pos = 500
			}
			positions.push(pos)
		}
		let last = obstacles.find(el => el.cPos.x === Math.max(...positions));
		if (!last){
		    last = {cPos: {x: 500}}
		}
		return last;
	}

	drawPositions() {
		let ctx = document.getElementById('obstacle-layer').getContext('2d');
		ctx.beginPath();

		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let pos;
			try {
				pos = this[obstacleName].cPos.x;
			} catch (e) {
				pos = 1000
			}
			ctx.moveTo(20, 5 + 5 * i);
			ctx.lineTo(20 + pos / 10, 5 + 5 * i);
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
		// this.drawPositions();
	}
}
