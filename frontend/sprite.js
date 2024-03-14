class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 40;
        this.height = 60;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameshold = 5; //Animation's speed
        this.offset = offset;


    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale);
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if (this.framesElapsed % this.frameshold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            }
            else {
                this.framesCurrent = 0;

            }
        }
    }

    setSource(imageSrc) {
        this.image.src = imageSrc;
    }

    drawBackground(ctx, canvasWidth, canvasHeight) {
        ctx.drawImage(this.image, 0, 0, canvasWidth, canvasHeight);
    }

}


