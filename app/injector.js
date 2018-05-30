// IIFE
(()=>{
	window.requestAnimationFrame(AIProcess);

	function AIProcess() {
		let speed = game.currentSpeed;
		let distance = game.obstacle.cPos.x - game.biker.cPos.x - game.biker.width + 120;
		let jumpDistance = speed * 7 * 3;

		if (distance < jumpDistance && distance > 0){
			jump();
		}

		window.requestAnimationFrame(AIProcess);
	}

	function jump(){
		game.biker.animate('jump');
	}

})();
