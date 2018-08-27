import Cloud from './Cloud'
import {randomNumber} from './globalFunctions'
import {settings} from "./Settings";

export default class Sky {
	constructor() {
		let me = this;
		me.cloudsNumber = settings.cloudsNumber;
		me.generateClouds();
	}

	generateClouds() {
		for (let i = 1; i <= this.cloudsNumber; i++) {
			let cloudName = 'cloud_' + i;
			this[cloudName] = new Cloud(randomNumber(0, 1200));
		}
	}

	move() {
		let me = this;

		for (let i = 1; i <= me.cloudsNumber; i++) {
			const cloudName = 'cloud_' + i;
			let cloud = me[cloudName];
			if (cloud.cPos.x < -cloud.width) {
				me[cloudName] = new Cloud(randomNumber(1000, 1200));
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
