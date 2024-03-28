class Node {
    constructor(value = null, next = null){
        this.value = value;
        this.next = next
    }
}

class LinkedList {
    constructor(nodes = []){
        this.nodes = nodes
    }
    appendNode(node) {
        let lastNode = null
        try{
            lastNode = this.nodes[this.nodes.length - 1]
        }catch{
            console.log('List is empty')
        }

        if(lastNode != null){
            lastNode.next = node.value
            node.next = null
            this.nodes.push(node)
        }else{
            this.nodes.push(node)
        }    
    }

    prependNode(node){
        let firstNode = null;
        try{
            firstNode = this.nodes[0]
        }catch{
            console.log('List is empty')
        }

        if(firstNode != null){
            node.next = firstNode.value
            this.nodes.unshift(node)
        }
    }

    get size(){
        return this.nodes.length
    }

    get head(){
        return this.nodes[0]
    }

    get tail(){
        return this.nodes[this.nodes.length - 1]
    }

    at(index){
        return this.nodes[index]
    }

    pop(){
        if(this.nodes.length === 0){
            return 'List is empty'
        }else if(this.nodes.length === 1){
            this.nodes.pop()
        }else{
            const secondToLastNode = this.nodes[this.nodes.length - 2]
            secondToLastNode.next = null
            this.nodes.pop()
        }
    }
    find(value){
        for(let index = 0; index < this.size; index++){
            if(this.nodes[index].value === value){
                return index
            }
        }
        return
    }

    contains(value){
        let node = this.nodes[0]
        while(true){
            if(node.value === value){
                return true}
            if(node.next === null){
                break
            }else{
                node = this.nodes[this.find(node.next)]
            }
        }
        return false
    }

    toString(){
        let string = ''
        this.nodes.forEach( node => {
            string += `( ${node.value} ) `
            if(node.next != null){
                string += '-> '
            }
        })
        return string
    }

    insertAt(index, value){
        const nodeBefore = this.nodes[index - 1]
        const nodeAfter = this.nodes[index].value
        const newNode = new Node(value, nodeAfter)
        nodeBefore.next = newNode.value
        this.nodes.splice(index, 0, newNode)
        return this.nodes
    }

    removeAt(index){
        const nodeBefore = this.nodes[index - 1]
        const nodeAfter = this.nodes[index + 1]
        nodeBefore.next = nodeAfter.value
        this.nodes.splice(index, 1)
        return this.nodes
    }
}

const myLL = new LinkedList()

const node1 = new Node('hello')
const node2 = new Node('world')
const node3 = new Node('what')
const node4 = new Node('yo')
myLL.appendNode(node1)
myLL.appendNode(node2)
myLL.prependNode(node3)
myLL.appendNode(node4)

console.log(myLL)
console.log(myLL.size)
console.log(myLL.head)
console.log(myLL.tail)
console.log(myLL.at(2))
console.log(myLL.contains('hello'))
console.log(myLL.find('yo'))
console.log(myLL.insertAt(2, 'heyo'))
console.log(myLL.removeAt(3))
console.log(myLL.toString())

