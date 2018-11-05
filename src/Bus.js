class Bus {
    constructor(commands){
        const initDirection = commands.split(' ')[1].split(',');
        this.x = parseInt(initDirection[0]);
        this.y = parseInt(initDirection[1]);
        this.direction = initDirection[2];
    }
    report(){
        return `${this.x},${this.y},${this.direction}`;
    }
}

module.exports = Bus;