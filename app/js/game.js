class GameRunner {
  constructor() {
    this.currentSpeed = 1;
    this.points = 0;
    this.acceleration = 0.001;
  }

  start() {
  	if (!this.isRunning){
        let me = this;
  		me.isRunning = true;
        me.background = new Background();
        me.biker = new Biker();
        me.obstacle = new Obstacle();
        me.moveObstacles();
	  }
  }

  moveObstacles(){
      let me = this;
      me.points++;
      me.currentSpeed+= me.acceleration;
      me.obstacle.render();
      me.obstacle.cPos.x = me.obstacle.cPos.x > -me.obstacle.width ? me.obstacle.cPos.x - me.currentSpeed : 1000;
      window.requestAnimationFrame(function () {
          me.moveObstacles();
      });
  }

  gameOver() {

  }
}

let game = new GameRunner();

game.start();