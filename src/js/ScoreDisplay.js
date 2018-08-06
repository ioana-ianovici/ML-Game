import Digit from "./Digit";

export default class ScoreDisplay {
	constructor() {
		this.canvas = document.getElementById("biker-layer");
	}

	showScore(score) {
		let me = this,
				scStr = score.toString(),
				len = scStr.length,
				digits = [];

		me.canvas.getContext('2d').clearRect(me.canvas.width - 23 * len, 0, 23 * len, 30);

		for (let i = 0; i < len; i++) {
			digits[i] = new Digit(scStr[i], len - i);
		}
	}


}
