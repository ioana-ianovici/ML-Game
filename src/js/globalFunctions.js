export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function probability(percent) {
	return Math.random() * 100 < percent;
}