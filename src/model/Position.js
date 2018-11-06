const Carpark = require('./Carpark');

class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    move(offset){
        const x = this.x + offset.x;
        const y = this.y + offset.y;

        const carpark = new Carpark();
        if(!carpark.isOutOfBoundary(x, y)){
            this.x = x;
            this.y = y;
            return this;
        }
    }
}
module.exports = Position;