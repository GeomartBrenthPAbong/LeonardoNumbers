# LeonardoNumbers
This repository has the implementation of leonardo numbers, creating a tree based on leonardo numbers, creating random access array using the leonardo tree and using the iterator functions for leonardo numbers to have a fast time complexity. All are implemented in javascript.

# NOTE
All answers can be found in ANSWERS.txt file

# Usage
Import LeonardoNumbers  
    var ln = require('./LeonardoNumbers');

## Sequence number generators
Access the generators by:  
    ln.SequenceGenerators.[generator here]

Types of generators:
    * LeonardoNumberSolver
    * LeonardoNumberSolverNoCache
    * FibonacciNumberSolver
    * LeonardoNumberSolverDecorator

To get a number from a generator, you just have to call the get function of the instance of that generator

Example:  
    var l = new ln.SequenceGenerators.LeonardoNumberSolver();
    console.log(l.get(4));

## Sequence number generation via iterators
Access iterators by:  
    ln.LeonardoIterators.[iterator here]

Types of Iterators:
    * LeonardoNumberIterator
    * LeonardoNumberIteratorCached

Same as above, to generate a number, call get function

Example:  
    var l = new ln.LeonardoIterators.LeonardoNumberIterator();
    console.log(l.get(4));

## Data structures
Access data structure by:  
    ln.ds

Types of data structures:
    * LeonardoTree
    * LeonardoArray

Example:
    var la = new ln.ds.LeonardoArray(9);
    la.set(0, 10);
    console.log(la.get(0));
    
    var lt = new ln.ds.LeonardoTree(9);
    lt.insert(9);
    lt.insert(10);
    lt.find(10);
    lt.remove(10);