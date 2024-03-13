class Wizard {
    constructor(index, { position }) {
        this.index = index;
        this.position = position;

        this.fireball = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            velocity: 10
        }

        this.health = 70;
    }


    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.position.x, this.position.y, 40, 60);
    }

    drawFireball(x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }


    fire(targetX, targetY) {
        const dx = targetX - this.fireball.position.x;
        const dy = targetY - this.fireball.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = 5; // Set threshold value

        if (distance > threshold) {
            const vx = (dx / distance) * this.fireball.velocity;
            const vy = (dy / distance) * this.fireball.velocity;

            this.fireball.position.x += vx;
            this.fireball.position.y += vy;
            this.drawFireball(this.fireball.position.x, this.fireball.position.y);


        } else {
            this.fireball.x = targetX;
            this.fireball.y = targetY;
        }

    }


    // Modify the fire method of the wizard to enqueue the fireball action
    // fire(targetX, targetY) {
    //     const self = this;

    //     // Define the fireball action
    //     const fireballAction = function () {
    //         const dx = targetX - self.fireball.position.x;
    //         const dy = targetY - self.fireball.position.y;
    //         const distance = Math.sqrt(dx * dx + dy * dy);

    //         const threshold = 5; // Set threshold value

    //         if (distance > threshold) {
    //             const vx = (dx / distance) * self.fireball.velocity;
    //             const vy = (dy / distance) * self.fireball.velocity;

    //             self.fireball.position.x += vx;
    //             self.fireball.position.y += vy;
    //             self.drawFireball(self.fireball.position.x, self.fireball.position.y);

    //             // Re-enqueue the fireball action if it's not finished
    //             enqueueAnimation(fireballAction);
    //         } else {
    //             self.fireball.position.x = targetX;
    //             self.fireball.position.y = targetY;
    //         }
    //     };

    //     // Enqueue the fireball action
    //     enqueueAnimation(fireballAction);
    // }





}