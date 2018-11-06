const Carpark = require('./Carpark');

function placeParser(){
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
            !['north', 'east', 'south', 'west'].includes(place[2].toLowerCase())){
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