/**
 * Module Dependencies
 */
var assert = require('assert');
var leo_arr = require('../../lib/leonardo_array');

describe("Leonardo Array Tests", function(){
    it("should respond as expected", function(){
        var larray = new leo_arr.LeonardoArray(9);
        
        assert.equal(larray.getMaxSize(), 9, "Max Size test passed");
        assert.equal(larray.getSize(), 0, "Size test passed");
        
        larray.set(1, 10);
        larray.set(2, 1);
        larray.set(0, 5);
        larray.set(6, 12);
        
        assert.equal(larray.get(1), 10, "Element found");
        assert.equal(larray.get(2), 1, "Element found");
        assert.equal(larray.get(0), 5, "Element found");
        assert.equal(larray.get(6), 12, "Element found");
        assert.equal(larray.get(7), null, "Element should not be found");
        
        assert.equal(larray.getSize(), 4, "Size test passed");
        
        larray.set(6, 11);
        assert.equal(larray.get(6), 11, "Element found");
        assert.equal(larray.getSize(), 4, "Size test passed");
        
        larray.set(6, null);
        assert.equal(larray.getSize(), 3, "Size test passed");
    });
});