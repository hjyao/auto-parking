class Carpark{
    constructor(width = 5, length = 5){
        this.width = width;
        this.length = length;
    }
    
    isOutOfBoundary(x, y){
        if(x < 0 || x > this.width - 1 || y < 0 || y > this.length - 1) {
            return true;
        }
        return false;
    }
}

module.exports = Carpark;