
/**
 * Implementations
 */

/* Start SequenceElementSolver abstract class */

var SequenceElementSolver = function(){}

SequenceElementSolver.prototype.get = function(p_n){};
SequenceElementSolver.prototype.showList = function(p_stop){
    var list = '';
    
    for(var i = p_stop; i >= 0; i--)
        list = this.get(i) + ' ' + list;
    
    console.log(list);
}

SequenceElementSolver.prototype.outOfRangeHandler = function(p_n) {
    throw "Invalid argument.";
}

/* Start LeonardoNumberSolver class */

/**
 * Uses caching for getting a leonardo number
 */
var LeonardoNumberSolver = function(){}

LeonardoNumberSolver.prototype = Object.create(SequenceElementSolver.prototype);
LeonardoNumberSolver.prototype.m_memory = {0: 1, 1: 1};

LeonardoNumberSolver.prototype.get = function(p_n){
    if(0 > p_n)
        this.outOfRangeHandler(p_n);
    else if(!this.m_memory.hasOwnProperty(p_n))
        this.m_memory[p_n] = this.get(p_n - 1) + this.get(p_n - 2) + 1;
        
    return  this.m_memory[p_n];
}

/**
 * Uses no caching for getting a leonardo number.
 */
var LeonardoNumberSolverNoCache = function(){}
LeonardoNumberSolverNoCache.prototype = Object.create(LeonardoNumberSolver.prototype);

LeonardoNumberSolverNoCache.prototype.get = function(p_n){
    if(0 > p_n)
        this.outOfRangeHandler(p_n);
    else if(1 >= p_n)
        return 1;
    else
        return this.get(p_n - 1) + this.get(p_n - 2) + 1;
}


LeonardoNumberSolver.prototype.showList = function(p_stop){
    SequenceElementSolver.prototype.showList.call(this, p_stop);
}

/* Start FibonacciNumberSolver class */

/**
 * Uses caching for getting a fibonacci number
 */
var FibonacciNumberSolver = function(){}

FibonacciNumberSolver.prototype = Object.create(SequenceElementSolver.prototype);
FibonacciNumberSolver.prototype.m_memory = {0: 0, 1: 1, 2: 1};
FibonacciNumberSolver.prototype.get = function(p_n){
    if(0 > p_n)
        this.outOfRangeHandler(p_n);
    else if(!this.m_memory.hasOwnProperty(p_n))
        this.m_memory[p_n] = this.get(p_n - 1) + this.get(p_n - 2);
        
    return  this.m_memory[p_n];
}

FibonacciNumberSolver.prototype.showList = function(p_stop){
    SequenceElementSolver.prototype.showList.call(this, p_stop);
}

/* Start SequenceElementSolverDecorator abstract class */

var SequenceElementSolverDecorator = function(p_sequence_element_solver){
    this.sequence_element_solver = p_sequence_element_solver;
}

SequenceElementSolverDecorator.prototype = Object.create(SequenceElementSolver.prototype);

/* Start LeonardoNumberSolverDecorator class */

/**
 * p_sequence_element_solver SequenceElementSolver The number generator of a given sequence
 */
var LeonardoNumberSolverDecorator = function(p_sequence_element_solver){
    SequenceElementSolverDecorator.call(this, p_sequence_element_solver);
}

LeonardoNumberSolverDecorator.prototype = Object.create(SequenceElementSolverDecorator.prototype);
LeonardoNumberSolverDecorator.prototype.m_memory = {};
LeonardoNumberSolverDecorator.prototype.get = function(p_n){
    if(0 > p_n)
        this.outOfRangeHandler(p_n);
    if(!this.m_memory.hasOwnProperty(p_n))
        this.m_memory[p_n] = 2 * this.sequence_element_solver.get(p_n + 1) - 1;
    
    return this.m_memory[p_n];
}

LeonardoNumberSolverDecorator.prototype.showList = function(p_stop){
    SequenceElementSolver.prototype.showList.call(this, p_stop);
}


/**
 * Exports
 */

var exports = module.exports = {}

exports.LeonardoNumberSolver = LeonardoNumberSolver;
exports.LeonardoNumberSolverNoCache = LeonardoNumberSolverNoCache;
exports.FibonacciNumberSolver = FibonacciNumberSolver;
exports.LeonardoNumberSolverDecorator = LeonardoNumberSolverDecorator;
