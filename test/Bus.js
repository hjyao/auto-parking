var assert = require('assert');
var Bus = require('../src/Bus');

describe('bus', function() {
  it('should be able to report current state after initialization', function() {
    const input1 = 'PLACE 0,0,NORTH';
    const input2 = 'PLACE 1,2,SOUTH';
    let bus1 = new Bus(input1);
    let bus2 = new Bus(input2);
    
    assert.equal(bus1.report(), '0,0,NORTH');
    assert.equal(bus2.report(), '1,2,SOUTH');
  });

});