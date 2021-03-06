import Digit from "./Digit";
import Sprite from "./Sprite";
import img from "../img/environment_sheet.png";
import {assetsOptions} from "./AssetsOptions";

export default class ScoreDisplay {
	constructor() {
		this.canvas = document.getElementById("biker-layer");
	}

	showScore(score) {
		this.displayNumber(score, 0);
	}

	gameOver() {
		let pos = {
			x: (1000 - assetsOptions.game_over.width) / 2,
			y: 110
		};
		this.createAsset(assetsOptions.game_over, pos);
	}

	showHIScore(score) {
		let me = this,
				pos = {
					x: 1000 - 300,
					y: 0
				};
		me.createAsset(assetsOptions.HI, pos);
		me.displayNumber(score, 6);
	}

	createAsset(options, pos) {
		let a = new Sprite({
			canvas: this.canvas,
			imageSrc: img,
			width: options.width,
			height: 26,
			origin: {x: options.x, y: 0},
			pos
		});
		a.draw();
	}

	displayNumber(number, pos = 0) {
		let me = this,
				scStr = number.toString(),
				len = scStr.length;

		me.canvas.getContext('2d').clearRect(me.canvas.width - (pos > 5 ? 230 : 115), 0, 115, 30);

		// display each digit of the number in their position
		for (let i = 0; i < 5; i++) {
			if (i < len) {
				new Digit(scStr[len - i - 1], i + pos);
			} else {
				new Digit(0, i + pos);
			}
		}
	}
}