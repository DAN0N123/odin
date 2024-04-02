class Node {
    static instances = [];

    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        Node.instances.push(this);
    }
}



class Tree {
    constructor(arr){
        const sortedArr = arr.sort( (a,b) => a - b)
        const myArr = Array.from(new Set(sortedArr))
        this.root = this.buildTree(myArr)
    }

    buildTree(arr){
        if(arr.length === 0) return null;
        const middleIndex = Math.floor(arr.length / 2)
        const root = new Node(arr[middleIndex])
        root.left = this.buildTree([...arr].splice(0, middleIndex));
        if(root.left != null) root.left.parent = root;
        root.right = this.buildTree([...arr].splice(middleIndex + 1));
        if(root.right != null) root.right.parent = root;
        
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
      }
    }

    find(value, node = this.root){
      if(node.data === value){
        return node
      }else{
        if(node.left && value < node.data){
          return this.find(value, node.left)
        }else if(node.right && value > node.data){
          return this.find(value, node.right)
        }
        console.log("Value doesn't exist")
        return null
      }
    }
    findLowest(root){
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

    levelOrder(){
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
      return myData;
    }

    

    preOrder(node = this.root){
      if(node === null) return;

      console.log(node);
      this.preOrder(node.left);
      this.preOrder(node.right);

    }

    inOrder(node = this.root){
      if(node === null) return;

      this.inOrder(node.left);
      console.log(node);
      this.inOrder(node.right);

    }

    postOrder(node = this.root){
      if(node === null) return;

      
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node);

    }
}


const myTree = new Tree([1,645,32,45,12,3,3,5678,3,3,56,7,3,2,2,1])


function prettyPrint(node, prefix = "", isLeft = true){

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
// myTree.insert(13)
// myTree.insert(8)
// myTree.insert(25)
// myTree.insert(17)
// myTree.insert(58)
// myTree.insert(41)
// myTree.insert(67)
// myTree.insert(22)
// myTree.insert(62)
// myTree.insert(54)
// myTree.insert(61)
// myTree.insert(55)
// myTree.insert(34)
// myTree.insert(69)
// myTree.insert(48)
// myTree.insert(29)
// myTree.insert(39)

// console.log(myTree.delete(7))
prettyPrint(myTree.root)
console.log(myTree.levelOrder())
// myTree.inOrder()
myTree.postOrder()

