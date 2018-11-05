var assert = require('assert');
var Bus = require('../src/Bus');

describe('bus', function() {
  it('should report current state after initation', function() {
    
    const input = 'PLACE 0,0,NORTH';
    let bus = new Bus(input);
    
    assert.equal(bus.report(), '0,0,NORTH');
  });
});