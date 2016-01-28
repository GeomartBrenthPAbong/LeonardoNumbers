/**
 * Module Dependencies
 */
var assert = require('assert');
var leo_num = require('../../lib/leonardo_numbers');

describe("Generation of leonardo numbers with caching", function(){
    it('should return the corresponding leonardo number or throw an error', function(){
        leonardo_number = new leo_num.LeonardoNumberSolver();
        
        assert.equal(leonardo_number.get(15), 1973);
        assert.equal(leonardo_number.get(0), 1);
        
        assert.throws(function(){
                        leonardo_number.get(-10)
                    }, function(e){
                        return "Invalid argument." == e;
                    });
    });
});

describe("Generation of leonardo numbers with no caching", function(){
    it('should return the corresponding leonardo number or throw an error', function(){
        leonardo_number = new leo_num.LeonardoNumberSolverNoCache();
        
        assert.equal(leonardo_number.get(15), 1973);
        assert.equal(leonardo_number.get(0), 1);
        
        assert.throws(function(){
                        leonardo_number.get(-10)
                    }, function(e){
                        return "Invalid argument." == e;
                    });
    });
});

describe("Generation of leonardo numbers using fibonacci", function(){
    it('should return the corresponding leonardo number or throw an error', function(){
        leonardo_number = new leo_num.LeonardoNumberSolverDecorator(new leo_num.FibonacciNumberSolver());
        
        assert.equal(leonardo_number.get(15), 1973);
        assert.equal(leonardo_number.get(0), 1);
        
        assert.throws(function(){
                        leonardo_number.get(-10)
                    }, function(e){
                        return "Invalid argument." == e;
                    });
    });
});