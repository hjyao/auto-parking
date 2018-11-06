const Direction = require('./Direction');
const Position = require('./Position');
const  Bus = require('./Bus');

function _isValidPlace(command){
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

function busInitializer(commands){
    let lines = commands.split('\n');
    const firstValidIndex = lines.findIndex((line) => line.startsWith('PLACE') && _isValidPlace(line));
    lines = lines.slice(firstValidIndex);

    const place = lines.shift().split(/ /g)[1].split(',');
    let position = new Position(parseInt(place[0]), parseInt(place[1]));
    let direction = new Direction(place[2]);
    let bus = new Bus(position, direction);

    const commandsMap = {
        'MOVE': bus.move.bind(bus),
        'LEFT': bus.left.bind(bus),
        'RIGHT': bus.right.bind(bus),
        'REPORT': bus.report.bind(bus)
    };
    let execucutableCommands = lines.map((c) => commandsMap[c]).filter((c) => c);
    bus.run = bus.run.bind(bus, execucutableCommands);
    return bus;
}

module.exports = busInitializer;