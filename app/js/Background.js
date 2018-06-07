class Background {
	constructor() {
		let me = this;
		me.width = 128;
		me.canvas = document.getElementById("background-layer");
		me.cloud = new Cloud();

		window.addEventListener("load", function () {
			me.reDraw();
		});
	}

	move(){
		let me = this;
		let distance = 1;

		me.cloud.cPos.x = me.cloud.cPos.x < -me.width ? 1000 : me.cloud.cPos.x - distance;

		me.reDraw();
	}

	reDraw () {
		this.cloud.render();
	}
}