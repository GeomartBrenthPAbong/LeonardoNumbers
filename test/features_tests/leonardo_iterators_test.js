/**
 * Module Dependencies
 */
var assert = require('assert');
var leo_num = require('../../lib/leonardo_iterators');

describe("Generation of leonardo numbers using iterators with no caching", function(){
    it('should return the corresponding leonardo number', function(){
        leonardo_number = new leo_num.LeonardoNumberIterator();
        
        assert.equal(leonardo_number.get(15), 1973);
        assert.equal(leonardo_number.get(0), 1);
        assert.equal(leonardo_number.get(-2), -3);
    });
});

describe("Generation of leonardo numbers using iterators with caching", function(){
    it('should return the corresponding leonardo number', function(){
        leonardo_number = new leo_num.LeonardoNumberIteratorCached();
        
        assert.equal(leonardo_number.get(15), 1973);
        assert.equal(leonardo_number.get(0), 1);
        assert.equal(leonardo_number.get(-2), -3);
    });
});