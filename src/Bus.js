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

    _turn(factor){
        const newIndex = (this.keys.indexOf(this.current) + factor) % this.keys.length;
        this.current = this.keys[newIndex];
    }

    asString(){
        return this.current;
    }
}
module.exports = Direction;

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

class Bus {
    constructor(commands){
        let lines = commands.split('\n');

        const firstValidIndex = lines.findIndex((line) => line.startsWith('PLACE'));
        lines = lines.slice(firstValidIndex);
        const initDirection = lines.shift().split(/ /g)[1].split(',');
        this.position = new Position(parseInt(initDirection[0]), parseInt(initDirection[1]));
        this.direction = new Direction(initDirection[2]);

        lines.forEach((command) => {
            if('move' === command.toLowerCase()){
                this.direction.move(this.position);
            }else if('left' === command.toLowerCase()){
                this.direction.turnLeft();
            }else if('right' === command.toLowerCase()){
                this.direction.turnRight();
            }
        });
    }
    report(){
        return `${this.position.x},${this.position.y},${this.direction.asString()}`;
    }
}

module.exports = Bus;