/**
 * Implementations
 */

/* Start Traversal abstract class */

/**
 * p_data_processor:NodeProcessor Processes the current root
 * p_root:TreeNode The root node 
 */
var Traversal = function(p_data_processor, p_root){
    this.m_data_processor = p_data_processor;
    this.m_root = p_root;
}

Traversal.prototype.process = function(p_node){
    if(null != this.m_data_processor && 'function' == typeof this.m_data_processor.process)
        this.m_data_processor.process(p_node);
}

Traversal.prototype.traverse = function(){
    this.traverseH(this.m_root);
}

Traversal.prototype.traverseH = function(p_runner_node){}

/* Start BFS class */

var BFS = function(p_data_processor, p_root){
    Traversal.call(this, p_data_processor, p_root);
}

BFS.prototype = Object.create(Traversal.prototype);
BFS.prototype.traverse = function(){
    Traversal.prototype.traverse.call(this);
}
BFS.prototype.traverseH = function(p_runner_node){
    var queue = [];
    var current_node;

    queue.push(p_runner_node);
    
    do{
        current_node = queue.shift();
        
        if(null != current_node.m_left_child)
            queue.push(current_node.m_left_child);
        
        if(null != current_node.m_right_child)
            queue.push(current_node.m_right_child);
        
        this.process(current_node);
    }while(0 < queue.length);
}

/* Start Inverse Preorder Traversal */

/**
 * This traversal traverses the right first before the left
 */
var InversePreorder = function(p_data_processor, p_root){
    Traversal.call(this, p_data_processor, p_root);
}

InversePreorder.prototype = Object.create(Traversal.prototype);
InversePreorder.traverse = function(){
    Traversal.prototype.traverse.call(this);
}
InversePreorder.prototype.traverseH = function(p_runner_node){
    if(null == p_runner_node)
        return;
    
    this.process(p_runner_node);
    this.traverseH(p_runner_node.m_right_child);
    this.traverseH(p_runner_node.m_left_child);
}

/**
 * Exports
 */

var exports = module.exports = {}

exports.BFS= BFS;
exports.InversePreorder = InversePreorder;
