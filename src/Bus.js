class Direction {
    constructor(initDirection){
        this.current = initDirection;
        this.map = {
            'NORTH': new Position(0, 1),
            'EAST': new Position(1, 0),
            'SOUTH': new Position(0, -1),
            'WEST': new Position(-1, 0)
        };
    }

    move(position){
        const offset = this.map[this.current];
        return position.move(offset);
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
        this.x += offset.x;
        this.y += offset.y
        return this;
    }
}
module.exports = Position;
class Bus {
    constructor(commands){
        let lines = commands.split('\n');

        const initDirection = lines.shift().split(/ /g)[1].split(',');
        this.position = new Position(parseInt(initDirection[0]), parseInt(initDirection[1]));
        this.direction = new Direction(initDirection[2]);

        lines.forEach((command) => {
            if('move' === command.toLowerCase()){
                this.position = this.direction.move(this.position);
            }
        });
    }
    report(){
        return `${this.position.x},${this.position.y},${this.direction.asString()}`;
    }
}

module.exports = Bus;