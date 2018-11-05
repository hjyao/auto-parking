var assert = require('assert');
var Bus = require('../src/Bus');

describe('bus', function() {
  it('should be able to report current state after initialization', function() {
    const input1 = 'PLACE 0,0,NORTH';
    const input2 = 'PLACE 1,2,SOUTH';
    const bus1 = new Bus(input1);
    const bus2 = new Bus(input2);
    
    assert.equal(bus1.report(), '0,0,NORTH');
    assert.equal(bus2.report(), '1,2,SOUTH');
  });

  it('should be able to move after initialization', function() {
    const input = 'PLACE 0,0,NORTH\nMOVE';
    const bus = new Bus(input);

    assert.equal(bus.report(), '0,1,NORTH');
  })

});