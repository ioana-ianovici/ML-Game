class Biker {
  constructor() {
    let me = this;
    me.animations = {
    	wait: {
    		numberOfFrames: 1,
			ticksPerFrame: 60,
			frameRow: 0
		},
        ride: {
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
            ticksPerFrame: 20,
			frameRow: 2
        },
        crash: {
            numberOfFrames: 4,
            ticksPerFrame: 15,
			frameRow: 3
        }
    };
    me.sprite = new Sprite({
	    canvas: document.getElementById("biker-layer"),
	    imageSrc: "app/img/biker_spritesheet_2.png",
	    width: 200,
	    height: 200,
	    initialPosition: {
		    x: 0,
		    y:150
	    },
	    animations: me.animations
    });
    me.currentAction= 'ride'; // wait, jump, duck
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
      case 38: // up key -> jump
        e.preventDefault();
        this.sprite.move('up');
        break;
      case 40: // down key -> duck
        e.preventDefault();
        this.sprite.move('down');
        break;
      default:
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