/**
 * Module Dependencies
 */

var tree_trav = require('./tree_traversals');
var nod_proc = require('./node_processors');
var leo_tree = require('./leonardo_tree');

/**
 * Implementations
 */

/* Start Leonardo Array */

function LeonardoArray(p_n){
    this.setup(p_n);
}

LeonardoArray.prototype = (function(){
    var traverse = function(p_index, p_processor){
        if(p_index > m_max_index || 'function' != typeof p_processor)
            return;
        
        var current_node = m_memory.getRoot();
        
        while(null != current_node){
            if(current_node.m_data.m_index == p_index){
                p_processor(current_node);
                break;
            }
            
            if(current_node.m_data.m_index > p_index)
                current_node = current_node.m_right_child;
            else
                current_node = current_node.m_left_child;
        }
    };
    
    var setupH = function(p_n){
        if(0 > p_n)
            return null;
        
        m_memory = new leo_tree(p_n);
        m_traversal = new tree_trav.InverseInorder(new nod_proc.ArrayNodeProcessor(), m_memory.getRoot());
        m_traversal.traverse();
        m_max_index = m_memory.getMaxSize() - 1;
    }
    
    var m_memory = null;
    var m_traversal = null;
    var m_size = 0;
    var m_max_index = 0;
    
    return {
        constructor: LeonardoArray,
        setup: function(p_n){
            setupH(p_n);
        },
        set: function(p_index, p_value){
            if(p_index < 0 || p_index > m_max_index)
                throw "Index out of range.";
                
            traverse(p_index, function(p_current_node){
                var old_val = p_current_node.m_data.m_data;
                p_current_node.m_data.m_data = p_value;
                
                if(null == p_value)
                    m_size--;
                else if(null == old_val)
                    m_size++;
            });
        },
        get: function(p_index){
            var value = null;
            traverse(p_index, function(p_current_node){
                value = p_current_node.m_data.m_data;
            });
            
            return value;
        },
        getMaxSize: function(){
            return m_memory.getMaxSize();
        },
        getSize: function(){
            return m_size;
        }
    }
})();

/**
 * Exports
 */

var exports = module.exports = LeonardoArray;
