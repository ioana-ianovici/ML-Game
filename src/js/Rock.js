import img from '../img/environment_sheet.png'
import Sprite from './Sprite'

export default class Rock extends Sprite {
	constructor(pos, type) {
		let originX = type === 2 ? 100 : 0;

		super({
			canvas: document.getElementById("obstacle-layer"),
			imageSrc: img,
			width: 100,
			height: 90,
			origin: {x: originX, y: 128},
			pos: {
				x: pos,
				y: 175
			}
		});
	}
}