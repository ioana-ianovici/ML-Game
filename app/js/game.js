class GameRunner {
  constructor() {
  	let me = this;
    me.background = new Background();
    me.biker = new Biker();

    me.isRunning = false;


		// me.init();
  }

  init(){
  }

  start() {
  	if (!this.isRunning){
  		this.isRunning = true;
		  this.biker.sprite.move('down');
	  }
  }

  gameOver() {

  }
}

let game = new GameRunner();

game.start();