import Cloud from './Cloud'
import {randomNumber} from './globalFunctions'

export default class Sky {
	constructor() {
		let me = this;
		me.cloudsNumber = 5;
		me.generateClouds();
	}

	generateClouds() {
		for (let i = 1; i <= this.cloudsNumber; i++) {
			let cloudName = 'cloud_' + i;
			this[cloudName] = new Cloud(randomNumber(0, 1200), randomNumber(0, 80), randomNumber(10, 20) / 10);
		}
	}

	move() {
		let me = this;

		for (let i = 1; i <= me.cloudsNumber; i++) {
			const cloudName = 'cloud_' + i;
			let cloud = me[cloudName];
			if (cloud.cPos.x < -cloud.width) {
				me[cloudName] = new Cloud(randomNumber(1000, 1200), randomNumber(0, 80), randomNumber(10, 20) / 10);
			} else {
				cloud.cPos.x = cloud.cPos.x - cloud.speed;
			}
		}

		me.reDraw();
		let cbk = me.move.bind(me);
		window.requestAnimationFrame(cbk);
	}

	reDraw() {
		document.getElementById("background-layer").getContext('2d').clearRect(0, 0, 1000, 210);
		for (let i = 1; i <= this.cloudsNumber; i++) {
			this['cloud_' + i].draw();
		}
	}
}
