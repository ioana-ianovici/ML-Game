// IIFE
(()=>{
	window.requestAnimationFrame(AIProcess);
	jump();

	function AIProcess() {
		let speed = game.currentSpeed;
		let distance = game.obstacle.cPos.x - game.biker.cPos.x - game.biker.width + 120;
		let minJumpDistance = speed * 7 * 2;
		let maxJumpDistance = speed * 7 * 3.5;

		if (distance < maxJumpDistance && distance > minJumpDistance){
			jump();
		}

		window.requestAnimationFrame(AIProcess);
	}

	function jump(){
		game.biker.animate('jump');
	}

})();
