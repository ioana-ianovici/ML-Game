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
				lastPos = last.cPos.x,
				pos = randomNumber(500, 1000),
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
		let me = this,
				positions = [],
				obstacles = [];

		for (let i = 1; i <= me.obstaclesNumber; i++) {
			let obstacleName = 'obstacle_' + i,
					pos;
			try {
				pos = me[obstacleName].cPos.x;
				obstacles.push(me[obstacleName])
			} catch (e) {
				pos = 500
			}
			positions.push(pos)
		}

		let last = obstacles.find(el => el.cPos.x === Math.max(...positions));
		if (!last) {
			last = {cPos: {x: 500}}
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
