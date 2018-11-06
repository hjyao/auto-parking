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
        this.lines = commands.split('\n');
        const firstValidIndex = this.lines.findIndex((line) => line.startsWith('PLACE') && this._isValidPlace(line));
        this.lines = this.lines.slice(firstValidIndex);
        this._initPlace(this.lines.shift());
        this.commandsMap = {
            'MOVE': this.move.bind(this),
            'LEFT': this.left.bind(this),
            'RIGHT': this.right.bind(this),
            'REPORT': this.report.bind(this)
        };
        this.commands = this.lines.map((c) => this.commandsMap[c]).filter((c) => c);
        this.outputs = [];
    }

    _isValidPlace(command){
        const place = command.split(/ /g)[1].split(',');
        const x = parseInt(place[0]);
        const y = parseInt(place[1]);
        if(isNaN(x) || isNaN(y) ||
            x < 0 || x > 4 || y < 0 || y > 4 ||
            !['north', 'east', 'south', 'west'].includes(place[2].toLowerCase())){
            return false;
        }
        return true;
    }

    _initPlace(command){
        const place = command.split(/ /g)[1].split(',');
        this.position = new Position(parseInt(place[0]), parseInt(place[1]));
        this.direction = new Direction(place[2]);
    }

    report(){
        this.outputs.push(`${this.position.x},${this.position.y},${this.direction.asString()}`);
    }

    run(){
        this.commands.forEach((command) => command());
        return this.outputs;
    }

    move(){
        this.direction.move(this.position);
    }

    left(){
        this.direction.turnLeft();
    }
    
    right(){
        this.direction.turnRight();
    }
}

module.exports = Bus;