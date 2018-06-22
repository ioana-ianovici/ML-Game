class Biker extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: "app/img/biker_004.png",
			width: 100,
			height: 100,
			origin: {x: 0, y: 0},
			pos: {
				x: 0,
				y: 135
			}
		});
		let me = this;
		me.action = 'idle';
		me.nextAction = 'idle';
		me.framesNum = 1;
		me.frameIndex = 0;
		me.frameRow = 0;
		me.tpf = 100;
		me.tick = 0;
	}

	ride() {
		console.log('ride');
		let me = this;
		if (me.action !== 'ride') {
			me.action = 'ride';
			me.nextAction = null;
			me.framesNum = 8;
			me.frameIndex = 0;
			me.frameRow = 0;
			me.tpf = 4;
			me.tick = 0;
		}
	}

	jump() {
		console.log('jump');
		let me = this;
		if (me.action !== 'jump') {
			me.action = 'jump';
			me.nextAction = 'ride';
			me.framesNum = 4;
			me.frameIndex = 0;
			me.frameRow = 4;
			me.tpf = 7;
			me.tick = 0;
		}
	}

	duck() {
		console.log('duck');
		let me = this;
		if (me.action !== 'duck') {
			me.action = 'duck';
			me.nextAction = 'ride';
			me.framesNum = 2;
			me.tpf = 4;
			me.frameRow = 1;
			me.frameIndex = 0;
			me.tick = 0;
		}
	}

	unduck() {
		console.log('unduck');
		let me = this;
		if (me.action !== 'unduck') {
			me.action = 'unduck';
			me.framesNum = 2;
			me.tpf = 4;
			me.frameRow = 1;
			me.frameIndex = 0;
			me.tick = 0;
		}
	}

	ducking() {
		console.log('ducking');
		let me = this;
		if (me.action !== 'ducking') {
			me.action = 'ducking';
			me.framesNum = 6;
			me.tpf = 4;
			me.frameRow = 1;
			me.frameIndex = 0;
			me.tick = 0;
		}
	}

	crashDown() {
		console.log('crash down');
		let me = this;
		if (me.action !== 'crashDown') {
			me.action = 'crashDown';
			me.nextAction = 'lastFrame';
			me.framesNum = 9;
			me.tpf = 5;
			me.frameRow = 3;
			me.frameIndex = 0;
			me.tick = 0;
		}
	}

	crashUp() {
		console.log('crash up');
		let me = this;
		if (me.action !== 'crashUp') {
			me.action = 'crashUp';
			me.nextAction = 'lastFrame';
			me.framesNum = 8;
			me.tpf = 5;
			me.frameRow = 2;
			me.frameIndex = 0;
			me.tick = 0;
		}
	}

	lastFrame(){
		console.log('last frame');
		let me = this;
		me.frameIndex = me.framesNum -1;
		me.tpf = Infinity;
		me.tick = 0;
	}

	doNextAction(){
		let me = this;
		switch (me.nextAction){
			case 'ride':
				me.ride();
				break;
			case 'jump':
				me.jump();
				break;
			case 'duck':
				me.duck();
				break;
			case 'ducking':
				me.ducking();
				break;
			case 'lastFrame':
				me.lastFrame();
		}
	}

	reDraw() {
		let me = this;
		me.tick++;
		if (me.tick >= me.tpf) {
			me.tick = 0;
			me.switchFrame();
			me.canvas.getContext('2d').clearRect(0, 0, me.canvas.width, me.canvas.height);
			me.draw();
		}

		let cbk = me.reDraw.bind(me);
		window.requestAnimationFrame(cbk);
	}

	switchFrame() {
		let me = this;
		if (me.nextAction && me.frameIndex === me.framesNum - 1){
		    me.doNextAction();
		    return;
		}
		me.frameIndex = me.frameIndex >= me.framesNum - 1 ? 0 : me.frameIndex + 1;
		me.origin.x = me.frameIndex * me.width;
		me.origin.y = me.frameRow * me.height;
	}
}