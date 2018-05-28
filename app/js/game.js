class GameRunner {
  constructor() {
    this.currentSpeed = 1;
    this.points = 0;
  }

  start() {
  	if (!this.isRunning){
        let me = this;
  		me.isRunning = true;
        me.background = new Background();
        me.biker = new Biker();
        me.obstacle = new Obstacle();
        me.isRunning = false;
	  }
  }

  gameOver() {

  }
}

let game = new GameRunner();

game.start();