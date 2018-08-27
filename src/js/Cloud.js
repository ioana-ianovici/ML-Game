import img from '../img/environment_sheet.png'
import Sprite from './Sprite'
import {randomNumber} from "./globalFunctions";

export default class Cloud extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: img,
			width: 128,
			height: 64,
			origin: {x: 0, y: 24},
			pos: {
				x: randomNumber(0, 1200),
				y: randomNumber(0, 80)
			}
		});
		this.speed = randomNumber(10, 20) / 10;
	}
}
