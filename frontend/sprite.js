class Sprite {
    constructor() {
        this.image = new Image();
    }

    setSource(imageSrc) {
        this.image.src = imageSrc;
    }

    drawBackground(ctx, canvasWidth, canvasHeight) {
        ctx.drawImage(this.image, 0, 0, canvasWidth, canvasHeight);
    }
}


