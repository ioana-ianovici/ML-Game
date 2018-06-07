class Cloud extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 100,
			height: 90,
			origin: {x: 0, y: 128},
			initialPosition: {
				x: 1000,
				y: 280
			}
		});
	}
}