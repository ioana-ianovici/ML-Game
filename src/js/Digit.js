import img from '../img/environment_sheet.png'
import Sprite from './Sprite'

export default class Digit extends Sprite {
	constructor(i) {
		let width = 23;
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: img,
			width,
			height: 30,
			origin: {x: width * i, y: 0},
			pos: {
				x: 1000-width,
				y: 0
			}
		});
	}
}
