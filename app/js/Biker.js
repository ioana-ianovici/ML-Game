class Biker {
  constructor(name) {
    let me = this;
    me.name = name;
    me.sprite = new Sprite({
	    canvas: document.getElementById("biker-layer"),
	    imageSrc: "app/img/biker_spritesheet_2.png",
	    numberOfFrames: 8,
	    ticksPerFrame: 4,
	    width: 200,
	    height: 200,
	    initialDirection: 0,
	    initialPosition: {
		    x: 0,
		    y:150
	    },
	    animations: {
		    down: 0,
		    left: 1,
		    right: 2,
		    up: 3
	    },
	    anim: {
		    move: {
			    numberOfFrames: 8,
			    ticksPerFrame: 4,
			    frameRow: 0
		    },
		    jump: {
			    numberOfFrames: 4,
			    ticksPerFrame: 20,
			    frameRow: 1
		    },
		    duck: {
			    numberOfFrames: 2,
			    ticksPerFrame: 10
		    },
		    crash: {
			    numberOfFrames: 4,
			    ticksPerFrame: 10
		    }
	    }
    });
    me.fired = false;
    me.initialize();
  }

  initialize() {
    let me = this;
    window.addEventListener("load", function () {
      me.sprite.render();
    });
    document.onkeydown = function (e) {
      me.move(e);
    };
    document.onkeyup = function (e) {
      me.stopMoving(e);
    };
  }

	action(e) {
		if (e.repeat || this.fired) {
			e.preventDefault();
			return
		}

		this.fired = e.keyCode;
		// console.log(this.fired);

		switch (e.keyCode) {
			case 38:  // up arrow -> leap
				e.preventDefault();
				this.sprite.move('up');
				break;
			case 40:  // down arrow -> duck
				e.preventDefault();
				this.sprite.move('down');
				break;
			default:
				// console.log("only arrow keys work my friend");
				//do nothing
		}
	}

  move(e) {
    if (e.repeat || this.fired) {
      e.preventDefault();
      return
    }

    this.fired = e.keyCode;
    // console.log(this.fired);

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        this.sprite.move('left');
        break;
      case 38:
        e.preventDefault();
        this.sprite.move('up');
        break;
      case 39:
        e.preventDefault();
        this.sprite.move('right');
        break;
      case 40:
        e.preventDefault();
        this.sprite.move('down');
        break;
      default:
        console.log("only arrow keys work my friend");
      //do nothing
    }
  }

  stopMoving(e) {
    if (this.fired === e.keyCode) {
      this.fired = false;
      this.sprite.stopMoving();
    }
  }
}