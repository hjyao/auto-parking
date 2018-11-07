const Position = require('./Position');

class Navigation {
    constructor(initDirection, position){
        this.currentDirection = initDirection;
        this.position = position;
        this.map = {
            'NORTH': new Position(0, 1),
            'EAST': new Position(1, 0),
            'SOUTH': new Position(0, -1),
            'WEST': new Position(-1, 0)
        };
        this.keys = Object.keys(this.map);
    }

    move(){
        const offset = this.map[this.currentDirection];
        return this.position.move(offset);
    }

    turnLeft(){
        this._turn(3);
    }

    turnRight(){
        this._turn(1);
    }

    asString(){
        return `${this.position.x},${this.position.y},${this.currentDirection}`;
    }

    _turn(factor){
        const newIndex = (this.keys.indexOf(this.currentDirection) + factor) % this.keys.length;
        this.currentDirection = this.keys[newIndex];
    }
}
module.exports = Navigation;