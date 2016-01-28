/**
 * Implementations
 */

var NodeProcessor = function(){}
NodeProcessor.prototype.process = function(p_node){
    return this.processH(p_node);
}

NodeProcessor.prototype.processH = function(p_node){
    return p_node.m_data;
}

/**
 * Can be used to print the data stored in the Leonardo Tree.
 */
var NodeDataPrinter = function(){
    this.m_data = '';
    NodeProcessor.call(this);
}

NodeDataPrinter.prototype = Object.create(NodeProcessor.prototype);
NodeDataPrinter.prototype.process = function(p_node){
    NodeProcessor.prototype.process.call(this, p_node);
}

NodeDataPrinter.prototype.processH = function(p_node){
    if(null != p_node && null != p_node.m_data)
        this.m_data += ' ' + p_node.m_data;
    else if(null != p_node)
        this.m_data += ' null';
}

NodeDataPrinter.prototype.print = function(){
    console.log(this.m_data);
}

NodeDataPrinter.prototype.flush = function(){
    this.m_data = '';
}

/**
 * Used by ArrayNodeProcessor for creating LeonardoArray
 */
var ArrayCell = function(p_index, p_data){
    this.m_index = p_index;
    this.m_data = p_data;
}


/**
 * Node used for processing leonardo array nodes.
 */
var ArrayNodeProcessor = function(){
    this.m_index_counter = 0;
    NodeProcessor.call(this);
}

ArrayNodeProcessor.prototype = Object.create(NodeProcessor.prototype);
ArrayNodeProcessor.prototype.process = function(p_node){
    NodeProcessor.prototype.process.call(this, p_node);
}
ArrayNodeProcessor.prototype.processH = function(p_node){
    p_node.m_data = new ArrayCell(this.m_index_counter++, null);
}

/**
 * Exports
 */

var exports = module.exports = {}

exports.NodeDataPrinter = NodeDataPrinter;
exports.ArrayNodeProcessor = ArrayNodeProcessor;
