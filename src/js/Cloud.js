import img from '../img/environment_sheet.png'
import Sprite from './Sprite'

export default class Cloud extends Sprite {
	constructor(x, h, s) {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: img,
			width: 128,
			height: 64,
			origin: {x: 0, y: 24},
			pos: {
				x,
				y: h
			}
		});
		this.speed = s;
	}
}