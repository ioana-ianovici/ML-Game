import Sprite from './Sprite'

export default class Rock extends Sprite {
	constructor(pos, type) {
		let originX = 0;

		if (type === 2) {
			originX = 100
		}

		super({
			canvas: document.getElementById("obstacle-layer"),
			imageSrc: "src/img/environment_sheet.png",
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