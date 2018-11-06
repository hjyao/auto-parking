var assert = require('assert');
var Carpark = require('../src/model/Carpark');

describe('carpark', function() {
  describe('isOutOfBoundary', function() {
    it('should tell if coordinates are within carpark using default value, which is magic number 5', function() {
      const carpark = new Carpark();
      assert.equal(carpark.isOutOfBoundary(0, 0), false);
      assert.equal(carpark.isOutOfBoundary(4, 4), false);
      assert.equal(carpark.isOutOfBoundary(-1, 4), true);
      assert.equal(carpark.isOutOfBoundary(5, 5), true);
      assert.equal(carpark.isOutOfBoundary(6, 6), true);
    });

    it('should be able to reset boundaries', function(){
      const carpark = new Carpark(10, 8);
      assert.equal(carpark.isOutOfBoundary(9, 7), false);
      assert.equal(carpark.isOutOfBoundary(10, 8), true);
    });
  });
});