class Cloud extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 128,
			height: 64,
			origin: {x: 0, y: 24},
			initialPosition: {
				x: 500,
				y: 50
			}
		});
	}
}