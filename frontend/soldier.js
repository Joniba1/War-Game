class Soldier extends Sprite {
    constructor(index, { position, velocity, offset, imageSrc, scale = 1, framesMax = 1, sprites }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
        });

        this.index = index;

        //this.position = position
        this.velocity = velocity;

        //attack
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 70,
            height: 30
        }

        this.health = 150;
        this.isAttacking = false;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 9; //Animation's speed
        this.sprites = sprites;

        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;

        }
    }

    // draw(soldierColor) { //temp var
    //     ctx.beginPath();
    //     ctx.fillStyle = soldierColor;
    //     ctx.fillRect(this.position.x, this.position.y, 40, 60);

    //     //attackbox
    //     if (this.isAttacking) {
    //         ctx.beginPath();
    //         ctx.fillStyle = 'blue';
    //         ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height);
    //     }
    // }

    update(targetX, targetY) {
        this.draw();
        this.animateFrames();

        this.attackbox.position.x = this.position.x + this.attackbox.offset.x;
        this.attackbox.position.y = this.position.y;

        const dx = targetX - this.position.x;
        const dy = targetY - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = 2; // Set threshold value

        if (distance > threshold) {
            const vx = (dx / distance) * this.velocity.x;
            const vy = (dy / distance) * this.velocity.y;

            this.position.x += vx;
            this.position.y += vy;
        } else {
            this.position.x = targetX;
            this.position.y = targetY;
        }
    }

}

