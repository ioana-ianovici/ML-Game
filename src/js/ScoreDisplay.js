import img from '../img/environment_sheet.png'
import Sprite from './Sprite'
import {scoreOptions} from "./ScoreOptions";
import Digit from "./Digit";

export default class ScoreDisplay{
	constructor() {
		this.gameOver = new Sprite({
			canvas: document.getElementById("biker-layer"),
			imageSrc: img,
			width: scoreOptions.game_over.width,
			height: 30,
			origin: {x: scoreOptions.game_over.x, y: 0},
			pos: {
				x: 405,
				y: 110
			}
		})
		this.initDigits();
	}

	initDigits(){
		for (let i = 0; i < 10; i++) {
			let name = 'digit_' + i;
			this[name] = new Digit(i)
		}
	}

	display(){
		let me = this;
		// me.gameOver.draw();
	}

	showScore(score){
		let length = score.toString().length;
		// console.log('lenght', length);
		this.digit_1.draw();
	}


}
