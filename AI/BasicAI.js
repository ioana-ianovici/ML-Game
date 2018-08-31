export default class BasicAI {
	constructor() {
	}

	decide(distance, flying, speed) {
		if (flying) {
			//need to check untill plane has passed and unduck
			if (distance < 60 + 10 * speed && !AICtrl.ducking) {
				AICtrl.duck();
				AICtrl.ducking = true;
			}

		} else {
			if (AICtrl.ducking) {
				AICtrl.unduck();
				AICtrl.ducking = false;
			}

			if (distance < 60 + 15 * speed && distance > 60) {
				AICtrl.jump();
			}
		}
	}
}
