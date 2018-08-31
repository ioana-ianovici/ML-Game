import img from '../img/environment_sheet.png'
import Sprite from './Sprite'
import {assetsOptions} from "./AssetsOptions";

export default class Digit extends Sprite {
	constructor(num, pos) {
		let width = assetsOptions.digits.width;
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: img,
			width,
			height: 26,
			origin: {x: width * num, y: 0},
			pos: {
				x: 1000 - width * (1 + pos),
				y: 0
			}
		});
		this.draw();
	}
}
