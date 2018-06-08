class Plane extends Sprite {
	constructor(x) {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 100,
			height: 40,
			origin: {x: 0, y: 88},
			pos: {
				x,
				y: 132
			}
		});
	}
}