class Bus {
    constructor(commands){
        this.commands = commands;
    }
    report(){
        return '0,0,NORTH';
    }
}

module.exports = Bus;