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
			pos: {x: 0, y: 135}
		});
		let me = this;
		me.gravity = 10;
		me.groundLevel = 135;
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
			me.switchFrame(1);
		}
	}

	ride() {
		this.setProps('ride');
	}

	jump() {
		let me = this;
		me.setProps('jump');
		if (!me.jumping){
			me.jumping = true;
			me.verticalVelocity = 27;
		}
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
				me.setProps('ride');
				break;
			case 'jump':
				me.jump();
				break;
			case 'duck':
				me.setProps('duck');
				break;
			case 'unduck':
				me.setProps('unduck');
				break;
			case 'ducking':
				me.setProps('ducking');
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
		}

		let cbk = me.reDraw.bind(me);
		window.requestAnimationFrame(cbk);
	}

	switchFrame(set) {
		let me = this;
		if (me.jumping) {
			me.cPos.y = me.cPos.y - me.verticalVelocity;
			me.verticalVelocity = me.verticalVelocity - me.gravity;
			me.origin.x = me.frameSequence[1] * me.width;
			if (me.verticalVelocity < 0) {
				me.origin.x = me.frameSequence[2] * me.width;
			}
			if (me.cPos.y >= me.groundLevel) {
				me.jumping = false;
				me.verticalVelocity = 0;
				me.cPos.y = me.groundLevel;
				me.origin.x = me.frameSequence[3] * me.width;
				me.frameIndex = me.frameNum - 1;
			}
		} else {
			if (set) {
				me.origin.x = me.frameSequence[0] * me.width;
			} else {
				if (me.desiredAction){
				    me.nextAction = me.desiredAction;
				    if (me.desiredAction==='jump'){
					    me.action = 'ride';
				    }
				}
				if (me.nextAction && me.frameIndex === me.frameNum - 1) {
					me.doNextAction();
					return;
				}
				me.frameIndex = me.frameIndex >= me.frameNum - 1 ? 0 : me.frameIndex + 1;
				me.origin.x = me.frameSequence[me.frameIndex] * me.width;
			}
			me.origin.y = me.frameRow * me.height;
		}
		me.canvas.getContext('2d').clearRect(0, 0, me.canvas.width, me.canvas.height);
		me.draw();
	}
}
