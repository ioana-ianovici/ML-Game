// IIFE
(()=>{
	window.requestAnimationFrame(AIProcess);
	start();

	function AIProcess() {
		let speed = game.currentSpeed;
		let distance = game.obstacles['obstacle_1'].pos.x - game.biker.pos.x - game.biker.width;
		let minJumpDistance = speed * 7 * 2;
		let maxJumpDistance = speed * 7 * 3.5;

		if (distance < maxJumpDistance && distance > minJumpDistance){
			game.biker.animate('jump');
		}

		window.requestAnimationFrame(AIProcess);
	}

	function start(){
		game.runGame();
		game.biker.animate('jump');
	}

})();
