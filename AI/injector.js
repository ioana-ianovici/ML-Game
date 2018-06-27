// IIFE
(()=>{
	window.requestAnimationFrame(AIProcess);
	start();

	function AIProcess() {
		let speed = game.currentSpeed;
		let distance = game.obstacles['obstacle_1'].cPos.x - game.biker.cPos.x - game.biker.width;
		let minJumpDistance = speed * 7 * 2;
		let maxJumpDistance = speed * 7 * 3.5;

		if (distance < maxJumpDistance && distance > minJumpDistance){
			game.biker.animate('jump');
		}

		window.requestAnimationFrame(AIProcess);
	}

	function start(){
		game.run();
		game.biker.animate('jump');
	}

})();
