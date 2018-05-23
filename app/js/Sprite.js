class Sprite {
    constructor(options) {
        this.copyOptions(options);
        this.animate('wait')
    }

    copyOptions(options) {
        let me = this;
        me.canvas = options.canvas;
        me.image = new Image();
        me.image.src = options.imageSrc;
        me.width = options.width;
        me.height = options.height;
        me.animations = options.animations;
        me.cPos = options.initialPosition;
        me.lPos = {};
        me.lPos.x = me.cPos.x;
        me.lPos.y = me.cPos.y;
    }

    render() {
        let me = this,
            context = me.canvas.getContext('2d');

        // remove the image from last position
        context.clearRect(
            me.lPos.x,
            me.lPos.y,
            me.width,
            me.height);

        // update the last position
        me.lPos.x = me.cPos.x;
        me.lPos.y = me.cPos.y;

        // draw the image on the new position
        context.drawImage(
            me.image,
            me.frameIndex * me.width,
            me.frameRow * me.height,
            me.width,
            me.height,
            me.cPos.x,
            me.cPos.y,
            me.width,
            me.height
        );
    }

    update() {
        let me = this;
        me.tick++;
        if (me.tick > me.ticksPerFrame) {
            me.tick = 0;
            me.frameIndex = me.frameIndex < (me.numberOfFrames - 1) ? (me.frameIndex + 1) : 0;
            me.render();
        }
        if (me.action !== 'wait') {
            window.requestAnimationFrame(function () {
                me.update();
            })
        } else {
            window.requestAnimationFrame(function () {
                me.tick = 0;
                me.frameIndex = 0;
                me.render();
            })
        }
    }

    animate(action){
        let me = this;
        me.action = action;
        me.tick = 0;
        me.frameIndex = 0;
        me.ticksPerFrame = me.animations[action].ticksPerFrame;
        me.numberOfFrames = me.animations[action].numberOfFrames;
        me.frameRow = me.animations[action].frameRow;
        me.animated = true;
        me.update();
    }
}