class Bus {
    constructor(position, direction){
        this.position = position;
        this.direction = direction;
        this.outputs = [];
    }

    report(){
        this.outputs.push(`${this.position.x},${this.position.y},${this.direction.asString()}`);
    }

    run(commands){
        commands.forEach((command) => command());
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