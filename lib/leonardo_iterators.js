/**
 * Module Dependencies
 */

var leo_gen = require('./leonardo_numbers');

/**
 * Implementations
 */

leo_gen.LeonardoNumberSolver.prototype.m_last_index = {pos: 1, neg: 0};

var LeonardoNumberIterator = function(){
    leo_gen.LeonardoNumberSolver.call(this);
}

LeonardoNumberIterator.prototype = Object.create(leo_gen.LeonardoNumberSolver.prototype);
LeonardoNumberIterator.prototype.get = function(p_n){
    var n_2=1, n_1=1, temp=null;
    
    if(0 > p_n){
        while(p_n++ < 0){
            temp = n_1;
            n_1 = this.prev(n_1, n_2);
            n_2 = temp;
        }
    }
    else{
        while(p_n-- > 1){
            temp = n_1;
            n_1 = this.next(n_1, n_2);
            n_2 = temp;
        }
    }
    
    return n_1;
}

var LeonardoNumberIteratorCached = function(){
    leo_gen.LeonardoNumberSolver.call(this);
}

LeonardoNumberIteratorCached.prototype = Object.create(leo_gen.LeonardoNumberSolver.prototype);
LeonardoNumberIteratorCached.prototype.get = function(p_n){
    if(this.m_memory.hasOwnProperty(p_n))
        return this.m_memory[p_n];
    
    var number = null;
    
    if(0 > p_n){
        while(this.m_last_index.neg > p_n){
            this.m_last_index.neg--;
            this.m_memory[this.m_last_index.neg] = this.prev(this.m_memory[this.m_last_index.neg + 1],
                                                                this.m_memory[this.m_last_index.neg + 2]);
        }
        
        number = this.m_memory[this.m_last_index.neg];
    }
    else{
        while(this.m_last_index.pos < p_n){
            this.m_last_index.pos++;
            this.m_memory[this.m_last_index.pos] = this.next(this.m_memory[this.m_last_index.pos - 2],
                                                                this.m_memory[this.m_last_index.pos - 1]);
        }
        
        number = this.m_memory[this.m_last_index.pos];
    }
    
    return number;
}

leo_gen.LeonardoNumberSolver.prototype.next = function(p_i, p_j){
    return p_i + p_j + 1;
}

leo_gen.LeonardoNumberSolver.prototype.prev = function(p_i, p_j){
    return p_i - p_j - 1;
}

/**
 * Exports
 */

var exports = module.exports = {};

exports.LeonardoNumberIterator = LeonardoNumberIterator;
exports.LeonardoNumberIteratorCached = LeonardoNumberIteratorCached;
