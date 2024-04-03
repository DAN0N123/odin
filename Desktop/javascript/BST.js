class Node {
    static instances = [];

    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.level = 0;
        this.tree = null;
        Node.instances.push(this);
    }
    deleteNode(){
      const index = Node.instances.indexOf(this)
      Node.instances.splice(index, 1)
    }
    subtreeHeights(){
      const leftHeight = this.tree.height(this.left)
      const rightHeight = this.tree.height(this.right)
      return {'left': leftHeight, 'right': rightHeight}
    }

    static getNode(value){
      let myNode;
      for(const node of this.instances){
        if(node.data === value){
          myNode = node
        }
      }
      return myNode
    }

    static ultimateLeafNode(){
      let levels = [];
      for(const node of this.instances){
        levels.push(node.level)
      }
      return Math.max(...levels)
    }
      
}



class Tree {

    constructor(arr){
        const sortedArr = arr.sort( (a,b) => a - b)
        const myArr = Array.from(new Set(sortedArr))
        this.nodes = []
        this.root = this.buildTree(myArr)
        this.nodes.push(this.root)
        this.root.tree = this

    }
    get inOrder(){
      this._inOrder()
      return this.inOrderArr;
    }

    get postOrder() {
      this._postOrder();
      return this.postOrderArr;
    }

    get preOrder() {
      this._preOrder();
      return this.preOrderArr;
    }

    get levelOrder() {
      this._levelOrder()
      return this.levelOrderArr

    }

    buildTree(arr, step = 0){
        if(arr.length === 0) return null;
        const middleIndex = Math.floor(arr.length / 2)
        const root = new Node(arr[middleIndex])
        step++
        
        root.left = this.buildTree([...arr].splice(0, middleIndex), step);
        
        if(root.left != null) {
          root.left.parent = root
          root.left.level = step
          this.nodes.push(root.left);
          root.left.tree = this
        };

          


        root.right = this.buildTree([...arr].splice(middleIndex + 1), step);
        
        if(root.right != null){
          root.right.parent = root;
          root.right.level = step;
          this.nodes.push(root.right);
          root.right.tree = this
        }
        
        
        return root
    }

    insert(value, root = this.root){
      if(value < root.data && root.left === null){
        root.left = new Node(value)
        root.left.parent = root
      }
      if(value > root.data && root.right === null){
        root.right = new Node(value)
        root.right.parent = root
        
      }
      if(value > root.data){
        this.insert(value, root.right)
      }
      if(value < root.data){
        this.insert(value, root.left)
      }}



    find(value, node = this.root) {
      if(node.data === value){
        console.log(node)
        return node
      }else{
        if(node.left && value < node.data){
          return this.find(value, node.left)
        }else if(node.right && value > node.data){
          return this.find(value, node.right)
        }
        console.log("Value doesn't exist", node)
        return null
      }
    }

    findLowest(root) {
      if(root.left === null){
        return root
      }else{return this.findLowest(root.left)}
    }

    delete(value){
      let myNode = this.find(value)
      if(!myNode){
        return null
      }
      else{
        const where = myNode.data > myNode.parent.data ? 'right' : 'left'
        if(myNode.right === null && myNode.left === null){
          myNode.parent[where] = null;
        }else if(myNode.right === null && myNode.left != null){
          myNode.parent[where] = myNode.left;
          myNode.left.parent = myNode.parent
        }else if(myNode.right != null && myNode.left === null){
          myNode.parent[where] = myNode.right;
          myNode.right.parent = myNode.parent
        }else if(myNode.left.right != null){
          const rightSubtreeRoot = myNode.right
          myNode.parent[where] = myNode.left
          myNode.left.parent = myNode.parent
          const lowestOnRight = this.findLowest(rightSubtreeRoot)
          lowestOnRight.left = myNode.left.right
          myNode.left.right = rightSubtreeRoot
          myNode.right.parent = myNode.left
        }else{
          myNode.parent[where] = myNode.left
          myNode.left.parent = myNode.parent
          myNode.left.right = myNode.right
          myNode.right.parent = myNode.left
        }
        myNode = null;
      }
    }

    _levelOrder(){
      if(this.root === null) return;
      const myArr = [];
      const myData = [];
      myArr.push(this.root)
      while(myArr.length != 0){
        const currentNode = myArr[0]
        myData.push(currentNode.data)
        if(currentNode.left != null) myArr.push(currentNode.left)
        if(currentNode.right != null) myArr.push(currentNode.right)
        myArr.splice(0, 1)
      }
      this.levelOrderArr = myData;
      return myData;
    }

    

    _preOrder(node = this.root, arr = []){
      if(arr.length === this.nodes.length){
        this.preOrderArr = arr
      }
      if(node === null) return;
      if(!arr.includes(node.data)){
        arr.push(node.data)
      };
      this._preOrder(node.left, arr);
      this._preOrder(node.right, arr);
    }

    _inOrder(node = this.root, arr = []){
      if(arr.length === this.nodes.length){
        this.inOrderArr = arr
      }
      if(node === null) return;

      this._inOrder(node.left, arr);
      if(!arr.includes(node.data)){
        arr.push(node.data)
      };
      this._inOrder(node.right, arr);

    }

    _postOrder(node = this.root, arr = []){
      if(arr.length === this.nodes.length - 4){
        this.postOrderArr = arr
      }

      if(node === null) return;

      this._postOrder(node.left, arr);
      this._postOrder(node.right, arr);
      if(!arr.includes(node.data)){
        arr.push(node.data)
      };

    }

    height(node) {
      if(typeof node === 'number'){
        node = Node.getNode(node)
        if(!node){
          return null;
        }
      }
      if (node === null) {
          return -1; // Height of an empty subtree is -1
      } else {
          const leftHeight = this.height(node.left);
          const rightHeight = this.height(node.right);
  
          return Math.max(leftHeight, rightHeight) + 1;
      }
    }

    depth(node){
      const myNode = Node.getNode(node)
      return myNode.level
    }
    

    isBalanced(){
      for(const node of this.nodes){
        if(node.subtreeHeights().left > node.subtreeHeights().right + 1 || node.subtreeHeights().right > node.subtreeHeights().left + 1){
          return false
        }
      } return true
    }

    rebalance(){
      let nodeValues = [];
      for(const node of this.nodes){
        nodeValues.push(node.data)
        node.deleteNode()
        if(node != this.root) this.delete(node.data);
      }
      this.root.deleteNode()
      this.root = null;

      this.root = this.buildTree(nodeValues)
    }


    prettyPrint(node = this.root, prefix = "", isLeft = true){

      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
}



function randomNumberArr(){
  let numberArr = []
  for(let i = 0; i < 30; i++){
    let number = Math.random() * 100
    number = Math.floor(number)
    numberArr.push(number)
  }
  numberArr = Array.from(new Set(numberArr)).sort()
  return numberArr
}


randomNumberArr()


function bigTreeTest(){
  const testTree = new Tree(randomNumberArr())

  testTree.prettyPrint();

  console.log(`Is the tree balanced: ${testTree.isBalanced()}`)

  console.log(`All elements in level order: ${testTree.levelOrder}`)
  console.log(`All elements in preorder: ${testTree.preOrder}`)
  console.log(`All elements inorder: ${testTree.inOrder}`)
  console.log(`All elements in post order: ${testTree.postOrder}`)
}

bigTreeTest()