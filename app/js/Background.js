class Background {
	constructor() {
		let me = this;
		me.width = 128;
		// me.canvas = document.getElementById("background-layer"); // TODO
		me.cloud_1 = new Cloud(80, 20);
		me.cloud_2 = new Cloud(450, 60);
		me.cloud_3 = new Cloud(750, 100);

		window.addEventListener("load", function () {
			me.reDraw();
		});
	}

	move(){
		let me = this;

		me.cloud_1.cPos.x = me.cloud_1.cPos.x < -me.width ? 1000 : me.cloud_1.cPos.x - 1;
		me.cloud_2.cPos.x = me.cloud_2.cPos.x < -me.width ? 1000 : me.cloud_2.cPos.x - 1.5;
		me.cloud_3.cPos.x = me.cloud_3.cPos.x < -me.width ? 1000 : me.cloud_3.cPos.x - 1.3;

		me.reDraw();
	}

	reDraw () {
		document.getElementById("background-layer").getContext('2d').clearRect(0,0,1000,164);
		this.cloud_1.draw();
		this.cloud_2.draw();
		this.cloud_3.draw();
	}
}