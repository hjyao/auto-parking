class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    move(offset){
        const x = this.x + offset.x;
        const y = this.y + offset.y;
        if(!(x < 0 || x > 4 || y < 0 || y > 4)){
            this.x = x;
            this.y = y;
            return this;
        }
    }
}
module.exports = Position;