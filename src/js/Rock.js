import img from '../img/environment_sheet.png'
import Sprite from './Sprite'
import {probability} from "./globalFunctions";

export default class Rock extends Sprite {
	constructor(pos) {
		super({
			canvas: document.getElementById("obstacle-layer"),
			imageSrc: img,
			width: 100,
			height: 90,
			origin: {x: probability(50) ? 0 : 100, y: 128},
			pos: {
				x: pos,
				y: 175
			}
		});
	}
}