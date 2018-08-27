import img from '../img/environment_sheet.png'
import Sprite from './Sprite'

export default class TrailTile extends Sprite {
	constructor(x) {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: img,
			width: 512,
			height: 40,
			origin: {x: 0, y: 218},
			pos: {
				x,
				y: 210
			}
		});
	}
}
