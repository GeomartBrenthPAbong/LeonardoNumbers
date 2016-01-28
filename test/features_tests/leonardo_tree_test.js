/**
 * Module Dependencies
 */

var assert = require('assert');
var leo_tree = require('../../lib/leonardo_tree');

describe("Leonardo Tree tests", function(){
    it("should respond as expected", function(){
        ltree = new leo_tree.LeonardoTree(6);
        
        assert.equal(ltree.getMaxSize(), 9, "Max size is as expected.");
        assert.equal(ltree.getSize(), 0, "Current size is as expected.");
        
        assert.equal(ltree.insert(50), true, "Insertion successfull");
        assert.equal(ltree.insert(40), true, "Insertion successfull");
        
        assert.equal(ltree.getSize(), 2, "Current size is as expected.");
        
        assert.equal(ltree.insert(50), true, "Insertion successfull");
        assert.equal(ltree.insert(40), true, "Insertion successfull");
        assert.equal(ltree.insert(5), true, "Insertion successfull");
        assert.equal(ltree.insert(20), true, "Insertion successfull");
        assert.equal(ltree.insert(10), true, "Insertion successfull");
        assert.equal(ltree.insert(4), true, "Insertion successfull");
        assert.equal(ltree.insert(100), true, "Insertion successfull");
        
        assert.equal(ltree.getSize(), ltree.getMaxSize(), "Current size is as expected.");
        
        assert.equal(ltree.insert(40), false, "Insertion should be denied");
        
        assert.equal(ltree.find(50), 50, "Element found");
        assert.equal(ltree.find(10), 10, "Element found");
        assert.equal(ltree.find(100), 100, "Element found");
        assert.equal(ltree.find(-100), null, "Element should not be found");
        
        ltree.remove(100);
        ltree.remove(10);
        
        assert.equal(ltree.find(100), null, "Element should not be found after removing it");
        assert.equal(ltree.find(10), null, "Element should not be found after removing it");
        
        assert.equal(ltree.getSize(), 7, "Current size is as expected.");
    })
})