class Obstacles {
	constructor() {
		let me = this;
		me.lastObstaclePosition = 0;
		me.generateObstacles();
	}

	generateObstacles() {
		for (let i = 1; i <= 3; i++) {
			let obstacleName = 'obstacle_' + i;
			this.createObstacle(obstacleName);
		}
	}

	createObstacle(obstacleName) {
		let me = this;

		if (probability(70)) {
			me[obstacleName] = new Rock(randomNumber(me.lastObstaclePosition + 500, me.lastObstaclePosition + 1000), randomNumber(1, 2));
		} else {
			me[obstacleName] = new Plane(randomNumber(me.lastObstaclePosition + 500, me.lastObstaclePosition + 1000));
		}

		me.lastObstaclePosition = me[obstacleName].cPos.x;
	}

	move(distance) {
		let me = this;
		me.lastObstaclePosition -= distance;

		for (let i = 1; i <= 3; i++) {
			let obstacleName = 'obstacle_' + i;
			if (me[obstacleName].cPos.x < -me[obstacleName].width) {
				this.createObstacle(obstacleName)
			} else {
				me[obstacleName].cPos.x = me[obstacleName].cPos.x - distance;
			}

		}

		me.reDraw();
	}

	reDraw() {
		let canvas = document.getElementById("obstacle-layer");

		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 1; i <= 3; i++) {
			let obstacleName = 'obstacle_' + i;
			this[obstacleName].draw();
		}
	}
}