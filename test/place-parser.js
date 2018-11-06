var assert = require('assert');
var placeParser = require('../src/place-parser');

describe('placeParser', function() {
  describe('given place command string', function() {
    it('should parse the command to place fields', function(){
      const place = placeParser.parse('PLACE 0,1,NORTH');
      assert.equal(place[0], 0);
      assert.equal(place[1], 1);
      assert.equal(place[2], 'NORTH');
    });

    it('should tell if the command is valid', function(){
      assert.equal(placeParser.isValid('PLACE 1,1,NORTH'), true);
      assert.equal(placeParser.isValid('PLACE invalid,1,NORTH'), false);
      assert.equal(placeParser.isValid('PLACE 1,invalid,NORTH'), false);
      assert.equal(placeParser.isValid('PLACE 1,1,HELLO_KITTY'), false);
    });
  });
});