class GameRunner {
  constructor() {
    this.currentSpeed = 4;
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
        me.init();
	  }
  }

  init(){
      let me = this;
      window.addEventListener('keydown', function (e) {
          if (e.keyCode === 32){
              me.gameOver()
          }
      })
  }

  moveObstacles(){
      let me = this;
      me.points++;
      me.currentSpeed+= me.acceleration;
      me.obstacle.render();
      me.obstacle.cPos.x = me.obstacle.cPos.x > -me.obstacle.width ? me.obstacle.cPos.x - me.currentSpeed : 1000;
      me.animID = window.requestAnimationFrame(function () {
          me.moveObstacles();
      });
  }

  gameOver() {
    window.cancelAnimationFrame(this.animID);
  }
}

let game = new GameRunner();

game.start();