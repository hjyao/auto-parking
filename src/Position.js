const Carpark = require('./Carpark');
class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    move(offset){
        const carpark = new Carpark();
        const x = this.x + offset.x;
        const y = this.y + offset.y;

        if(!carpark.isOutOfBoundary(x, y)){
            this.x = x;
            this.y = y;
            return this;
        }
    }
}
module.exports = Position;