import img from '../img/biker_004.png'
import {animations} from "./BikerAnimations";
import Sprite from './Sprite'

export default class Biker extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("biker-layer"),
			imageSrc: img,
			width: 100,
			height: 100,
			origin: {x: 0, y: 0},
			pos: {
				x: 0,
				y: 135
			}
		});
		let me = this;
		me.setProps('idle');
	}

	setProps(action) {
		let me = this;
		let setting = animations[action];
		if (me.action !== action) {
			me.action = action;
			me.nextAction = setting.nextAction;
			me.frameRow = setting.frameRow;
			me.frameSequence = setting.frameSequence;
			me.frameNum = setting.frameSequence.length;
			me.tpf = setting.tpf;
			me.frameIndex = me.frameSequence[0];
			me.tick = 0;
		}
	}

	ride() {
		this.setProps('ride');
	}

	jump() {
		this.setProps('jump');
	}

	duck() {
		this.setProps('duck');
	}

	unduck() {
		this.setProps('unduck');
	}

	ducking() {
		this.setProps('ducking');
	}

	crashDown() {
		this.setProps('crashDown');
	}

	crashUp() {
		this.setProps('crashUp');
	}

	lastFrame() {
		let me = this;
		me.frameIndex = me.frameNum - 1;
		me.tpf = Infinity;
		me.tick = 0;
	}

	doNextAction() {
		let me = this;
		switch (me.nextAction) {
			case 'ride':
				this.setProps('ride');
				break;
			case 'jump':
				this.setProps('jump');
				break;
			case 'duck':
				this.setProps('duck');
				break;
			case 'unduck':
				this.setProps('unduck');
				break;
			case 'ducking':
				this.setProps('ducking');
				break;
			case 'lastFrame':
				me.lastFrame();
		}
	}

	reDraw() {
		let me = this;
		me.tick++;
		if (me.tick >= me.tpf) {
			console.log('frame:', me.frameIndex);
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
		if (me.nextAction && me.frameIndex === me.frameNum - 1) {
			me.doNextAction();
			return;
		}
		me.frameIndex = me.frameIndex >= me.frameNum - 1 ? 0 : me.frameIndex + 1;
		me.origin.x = me.frameIndex * me.width;
		me.origin.y = me.frameRow * me.height;
	}
}
