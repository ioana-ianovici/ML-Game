export default class BasicAI {
	decide(distance, flying, speed) {
		let action = 'nothing';

		if (flying) {
			if (distance < 80 + 10 * speed) {
				action = 'duck'
			}

		} else {
			action = 'unduck';

			if (distance < 80 + 15 * speed && distance > 60) {
				action = 'jump'
			}
		}
		return action
	}
}
