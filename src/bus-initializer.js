const Direction = require('./model/Direction');
const Position = require('./model/Position');
const Bus = require('./model/Bus');
const placeParser = require('./place-parser');

function busInitializer(commands){
    let commandLines = commands.split('\n');
    const firstValidIndex = commandLines.findIndex((line) => line.startsWith('PLACE') && placeParser.isValid(line));
    commandLines = commandLines.slice(firstValidIndex);
    const place = placeParser.parse(commandLines.shift());

    return {
        init: function(){
            const position = new Position(parseInt(place[0]), parseInt(place[1]));
            const direction = new Direction(place[2]);
            const bus = new Bus(position, direction);

            const commandsMap = {
                'MOVE': bus.move.bind(bus),
                'LEFT': bus.left.bind(bus),
                'RIGHT': bus.right.bind(bus),
                'REPORT': bus.report.bind(bus)
            };
            const execucutableCommands = commandLines.map((c) => commandsMap[c]).filter((c) => c);
            bus.run = bus.run.bind(bus, execucutableCommands);
            return bus;
        }
    }
}

module.exports = busInitializer;