const Position = require('./Position');

class Direction {
    constructor(initDirection){
        this.current = initDirection;
        this.map = {
            'NORTH': new Position(0, 1),
            'EAST': new Position(1, 0),
            'SOUTH': new Position(0, -1),
            'WEST': new Position(-1, 0)
        };
        this.keys = Object.keys(this.map);
    }

    move(position){
        const offset = this.map[this.current];
        return position.move(offset);
    }

    turnLeft(){
        this._turn(3);
    }

    turnRight(){
        this._turn(1);
    }

    asString(){
        return this.current;
    }

    _turn(factor){
        const newIndex = (this.keys.indexOf(this.current) + factor) % this.keys.length;
        this.current = this.keys[newIndex];
    }
}
module.exports = Direction;