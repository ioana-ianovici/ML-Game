class Background {
	constructor() {
		this.trail = new Trail();
		this.sky = new Sky();
	}

	move(distance){
		this.trail.move(distance);
		this.sky.move();
	}
}