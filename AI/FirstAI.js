export default class FirstAI {
	constructor(){
	}

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
		// console.log(action);
		return action
	}
}

/*
urmeaza de instalat numjs
si de creat functia de forward propagation
apoi de continuat tutorialul


 */