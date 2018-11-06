const Carpark = require('./Carpark');

function placeParser(){
    const VALID_DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const parse = function(command){
        return command.split(/ /g)[1].split(',');
    }
    
    const isValid = function(command){
        const place = parse(command);
        const x = parseInt(place[0]);
        const y = parseInt(place[1]);
        const carpark = new Carpark();
        if(isNaN(x) || isNaN(y) ||
            carpark.isOutOfBoundary(x, y) ||
            !VALID_DIRECTIONS.includes(place[2].toUpperCase())){
            return false;
        }
        return true;
    }

    return {
        isValid: isValid,
        parse: parse
    }
}

module.exports = placeParser();