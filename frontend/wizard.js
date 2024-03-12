class Wizard {
    constructor(index, { position }) {
        this.index = index;
        this.position = position;
    }


    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.position.x, this.position.y, 40, 60);
    }  
}