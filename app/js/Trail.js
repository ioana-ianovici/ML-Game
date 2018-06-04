class Trail extends Sprite {
	constructor(x) {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 512,
			height: 52,
			origin: {x: 0, y: 218},
			initialPosition: {
				x,
				y: 315
			}
		});
	}
}