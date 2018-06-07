class Obstacles {
	constructor() {
		let me = this;
		me.width = 512;
		me.obstacle_1 = new Rock(700, 1);
		me.obstacle_2 = new Rock(1200, 2);

		window.addEventListener("load", function () {
			me.reDraw();
		});
	}

	move(distance){
		let me = this;

		// me.obstacle_1.cPos.x -= distance;
		// me.obstacle_2.cPos.x -= distance;

		me.moveElement(me.obstacle_1,distance);
		me.moveElement(me.obstacle_2,distance);

		me.reDraw();
	}

	moveElement(element, distance){
		let pos = element.cPos,
				width = 512;

		pos.x = pos.x < -width ? 1000 : pos.x - distance;
	}

	reDraw(){
		let me = this;

		me.obstacle_1.render();
		me.obstacle_2.render();
	}
}