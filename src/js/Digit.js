import img from '../img/environment_sheet.png'
import Sprite from './Sprite'

export default class Digit extends Sprite {
	constructor(num, pos) {
		let width = 23;
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: img,
			width,
			height: 26,
			origin: {x: width * num, y: 0},
			pos: {
				x: 1000 - width * pos,
				y: 0
			}
		});
		this.draw();
	}
}
