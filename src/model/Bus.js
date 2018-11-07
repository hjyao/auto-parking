class Bus {

    constructor(navigation){
        this.navigation = navigation;
        this.outputs = [];
    }

    report(){
        this.outputs.push(this.navigation.asString());
    }

    run(commands){
        commands.forEach((command) => command());
        return this.outputs;
    }

    move(){
        this.navigation.move(this.position);
    }

    left(){
        this.navigation.turnLeft();
    }

    right(){
        this.navigation.turnRight();
    }
}

module.exports = Bus;