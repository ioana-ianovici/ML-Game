class Background {
	constructor() {
		let me = this;
		me.trail = new Trail();
		me.sky = new Sky();

	}

	move(distance){
		let me = this;

		me.trail.move(distance);
		me.sky.move();
	}

}