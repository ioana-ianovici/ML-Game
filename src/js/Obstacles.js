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
		let me = this,
				last = me.findLast(),
				lastPos = last.pos.x,
				pos = randomNumber(400 + 25 * currentSpeed, 800 + 50 * currentSpeed),
				planeAhead = last instanceof Plane;

		if (probability(settings.rockProbability)) {
			if (planeAhead) {
				pos += lastPos * currentSpeed / (3 + currentSpeed);
			} else {
				pos += lastPos;
			}
			pos = pos < lastPos ? lastPos + 1 : pos;
			me[obstacleName] = new Rock(pos);
		} else {
			if (planeAhead) {
				pos += lastPos;
			} else {
				pos += lastPos * (3 + currentSpeed) / currentSpeed;
			}
			me[obstacleName] = new Plane(pos);
		}
	}

	move(distance) {
		let me = this;

		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			let obstacle = me[obstacleName];

			if (obstacle.pos.x < -obstacle.width) {
				this.createObstacle(obstacleName, distance)
			} else {
				if (obstacle instanceof Plane) {
					obstacle.pos.x = obstacle.pos.x - distance - obstacle.speed;
				} else {
					obstacle.pos.x = obstacle.pos.x - distance;
				}
			}

		}

		me.reDraw();
	}

	findLast() {
		let me = this,
				positions = [],
				obstacles = [];

		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i,
					pos;
			try {
				pos = me[obstacleName].pos.x;
				obstacles.push(me[obstacleName])
			} catch (e) {
				pos = 500
			}
			positions.push(pos)
		}

		let last = obstacles.find(el => el.pos.x === Math.max(...positions));

		if (!last) {
			last = {pos: {x: 500}}
		}
		return last;
	}


	reDraw() {
		let canvas = document.getElementById("obstacle-layer");

		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 1; i <= this.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i;
			this[obstacleName].draw();
		}
	}
}
