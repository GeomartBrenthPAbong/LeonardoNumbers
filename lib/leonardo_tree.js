/**
 * Module dependencies.
 */

var leo_gen = require('./leonardo_numbers');

/**
 * Implementations
 */

var TreeNode = function(p_data){
    this.m_left_child = null;
    this.m_right_child = null;
    this.m_parent = null;
    this.m_data = p_data;
    this.m_full = false;
}

/* Start LeonardoTree class */

function LeonardoTree(p_n){
    this.setup(p_n);
}

LeonardoTree.prototype = (function(){
    var createTree = function(p_n){
        var current_node = new TreeNode(null);
    
        try{
            if(1 <= m_leonardo_number.get(p_n - 2)){
                current_node.m_left_child = createTree(p_n - 2);
                current_node.m_left_child.m_parent = current_node;
            }
            
            if(1 <= m_leonardo_number.get(p_n - 1)){
                current_node.m_right_child = createTree(p_n - 1);
                current_node.m_right_child.m_parent = current_node;
            }
        }catch(e){}
        
        return current_node;
    };
    
    var swap = function(p_node, p_detached_data){
        var temp_data = p_node.m_data;
        p_node.m_data = p_detached_data;
        
        return temp_data;
    };
    
    var rotateRight = function(p_node, p_data){
        if(null == p_node)
            return;
        
        p_data = swap(p_node, p_data);
        p_node = p_node.m_right_child;
        
        if(null == p_node)
            return;
        
        if(null == p_node.m_data){
            store(p_node, p_data);
            p_data = null;
            return;
        }

        if(isLeafNode(p_node)){
            if(p_node.m_data < p_data)
                p_data = swap(p_node, p_data);
            
            p_node = getLesserParent(p_node, p_data);
            rotateRight(p_node, p_data);
        }
        else
            insertH(p_node, p_data);
    };
    
    var rotateLeft = function(p_node, p_data){
        if(null == p_node)
            return;
        
        p_data = swap(p_node, p_data);
        p_node = p_node.m_left_child;
        
        if(null == p_node)
            return;
        
        if(null == p_node.m_data){
            store(p_node, p_data);
            p_data = null;
            return;
        }
        
        if(isLeafNode(p_node)){
            if(p_node.m_data > p_data)
                p_data = swap(p_node, p_data);
            
            p_node = getGreaterParent(p_node, p_data);
            rotateLeft(p_node, p_data);
        }
        else
            insertH(p_node, p_data);
    };
    
    var isLeafNode = function(p_node){
        return null == p_node.m_left_child && null == p_node.m_right_child;
    };
    
    var store = function(p_node, p_data){
        p_node.m_data = p_data;
                
        if(isLeafNode(p_node)){
            p_node.m_full = true;
            reportFullToParent(p_node.m_parent);
        }
    };
    
    var reportFullToParent = function(p_node){
        do{
            p_node.m_full = (p_node.m_left_child.m_full && p_node.m_right_child.m_full);
            
            p_node = (p_node.m_full)? p_node.m_parent: null;
        }while(null != p_node);
    };
    
    var getLesserParent = function(p_node, p_data){
        while(null != p_node && p_node.m_data > p_data)
            p_node = p_node.m_parent;
        
        return p_node;
    };
    
    var getGreaterParent = function(p_node, p_data){
        while(null != p_node && p_node.m_data < p_data)
            p_node = p_node.m_parent;
        
        return p_node;
    };
    
    var insertH = function(p_node, p_data){
        if(null == p_node)
            return;
        
        var nearest_not_full;
        
        do{
            if(null == p_node.m_data){
                store(p_node, p_data);
                break;
            }
            
            if(isLeafNode(p_node)){
                var parent_node = p_node.m_parent;
                
                if(null == parent_node)
                    break;
                
                if(((null == nearest_not_full || nearest_not_full == 'right') && p_node.m_data < p_data) ||
                    (nearest_not_full == 'left' && p_node.m_data > p_data))
                        p_data = swap(p_node, p_data);
                
                if(p_node == parent_node.m_left_child)
                    p_node = parent_node;
                else if(null == nearest_not_full || nearest_not_full == 'right')
                    p_node = getLesserParent(p_node, p_data);
                else
                    p_node = getGreaterParent(p_node, p_data);
                
                if(null == nearest_not_full || nearest_not_full == 'right')
                    rotateRight(p_node, p_data);
                else
                    rotateLeft(p_node, p_data);
                
                break;
            }
            
            if(!p_node.m_left_child.m_full)
                nearest_not_full = 'left';
            if(!p_node.m_right_child.m_full)
                nearest_not_full = 'right';
            
            if(p_node.m_data > p_data)
                p_node = p_node.m_right_child;
            else
                p_node = p_node.m_left_child;
        }while(null != p_node);
    };
    
    var findH = function(p_data){
        var node = m_root;
 
        while(null != node){
 
            if(null == node.m_data){
                node = null;
                break;
            }
           
            if(p_data == node.m_data)
                break;
            
            if(node.m_data > p_data)
                node = node.m_right_child;
            else
                node = node.m_left_child;
        }
        
        return node;
    };
    
    var removeH = function(p_treenode){
        if(isLeafNode(p_treenode))
            return;
        
        var runner_node = p_treenode.m_right_child;
        
        while(!isLeafNode(runner_node))
            runner_node = runner_node.m_left_child;
        
        p_treenode.m_data = runner_node.m_data;
        runner_node.m_data = null;
        runner_node.m_full = false;
        
        reportFullToParent(runner_node.m_parent);
        
        if(null == p_treenode.m_data)
            reportFullToParent(p_treenode.m_parent);
        
        removeH(runner_node);
    }
    
    var setupH = function(p_n){
        if(0 > p_n)
            return null;
        
        var counter = 1;
        
        if(1 == p_n){
            m_size = 1;
        }
        else{
            do{
                m_size = m_leonardo_number.get(++counter);
            }while(m_size < p_n);
        }

        m_root = createTree(counter);
    };
    
    var m_leonardo_number = new leo_gen.LeonardoNumberSolver();
    var m_root = null;
    var m_size = 0;
    var m_cur_size = 0;
    
    return {
        constructor: LeonardoTree,
        setup: function(p_n){
            setupH(p_n);
        },
        find: function(p_data){
            var data = findH(p_data);
            
            if(null == data)
                return null;
            
            return data.m_data;
        },
        insert: function(p_data){
            if(m_cur_size >= m_size)
                return false;
            
            insertH(m_root, p_data);
            m_cur_size++;
            
            return true;
        },
        remove: function(p_data){
            var treenode = findH(p_data);
            
            if(null == treenode)
                return;
            
            m_cur_size--;
            treenode.m_data = null;
            removeH(treenode);
        },
        getSize: function(){
            return m_cur_size;
        },
        getMaxSize: function(){
            return m_size;
        },
        getRoot: function(){
            return m_root;
        },
        getLeonardoNumberSolver: function(){
            return m_leonardo_number;
        }
    }
})();

/**
 * Exports
 */

var exports = module.exports = LeonardoTree;
