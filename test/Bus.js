var assert = require('assert');
var busInitializer = require('../src/bus-initializer');

describe('bus', function() {
  it('should be able to report current state after initialization', function() {
    const input1 = 'PLACE 0,0,NORTH\nREPORT';
    const input2 = 'PLACE 1,2,SOUTH\nREPORT';
    const bus1 = busInitializer(input1).init();
    const bus2 = busInitializer(input2).init();
    assert.equal(bus1.run()[0], '0,0,NORTH');
    assert.equal(bus2.run()[0], '1,2,SOUTH');
  });

  it('should be able to move after initialization', function() {
    const input = 'PLACE 0,0,NORTH\nMOVE\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '0,1,NORTH');
  });
  
  it('should be able to turn left', function() {
    const input = 'PLACE 0,0,NORTH\nLEFT\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '0,0,WEST');
  });

  it('should be able to turn right', function() {
    const input = 'PLACE 0,0,NORTH\nRIGHT\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '0,0,EAST');
  });

  it('should be able to turn and move', function() {
    const input = 'PLACE 0,0,NORTH\nRIGHT\nMOVE\nMOVE\nLEFT\nLEFT\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '2,0,WEST');
  });

  it('should ignore exiting move', function() {
    const input = 'PLACE 0,0,WEST\nMOVE\nMOVE\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '0,0,WEST');
  });

  it('should be able to keep moving after exiting move', function() {
    const input = 'PLACE 0,0,WEST\nMOVE\nMOVE\nRIGHT\nMOVE\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '0,1,NORTH');
  });

  it('should ignore invalid commands until the first PLACE for initialization', function() {
    const input = 'RIGHT\nMOVE\nMOVE\nPLACE 1,1,EAST\nMOVE\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '2,1,EAST');
  });

  it('should ignore another PLACE command and keep going', function() {
    const input = 'PLACE 1,1,EAST\nMOVE\nREPORT\nPLACE 3,3,SOUTH\nMOVE\nREPORT';
    const bus = busInitializer(input).init();

    assert.equal(bus.run()[0], '2,1,EAST');
    assert.equal(bus.run()[1], '3,1,EAST');
  });

  it('should ignore invalid PLACE command', function() {
    const input1 = 'PLACE 10,10,EAST\nREPORT\nPLACE 1,1,SOUTH\nREPORT';
    const bus1 = busInitializer(input1).init();

    const input2 = 'PLACE hello,kitty,EAST\nREPORT\nPLACE 1,1,SOUTH\nREPORT';
    const bus2 = busInitializer(input2).init();

    const input3 = 'PLACE 1,1,SOUTHEAST\nREPORT\nPLACE 1,1,SOUTH\nREPORT';
    const bus3 = busInitializer(input3).init();
    assert.equal(bus1.run()[0], '1,1,SOUTH');
    assert.equal(bus2.run()[0], '1,1,SOUTH');
    assert.equal(bus3.run()[0], '1,1,SOUTH');
  });
});