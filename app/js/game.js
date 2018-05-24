class GameRunner {
  constructor() {
  	let me = this;
    me.background = new Background();
    me.biker = new Biker();
    me.isRunning = false;

  }

  start() {
  	if (!this.isRunning){
  		this.isRunning = true;
	  }
  }

  gameOver() {

  }
}

let game = new GameRunner();

// game.start();