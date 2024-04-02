class hashMap{
    constructor(){
        this.buckets = Array(16).fill().map(() => []);
        this.loadFactor = 0.75
        this.populatedBuckets = []
        this.currentKeys = []
        this.currentValues = [];
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }
     
        return hashCode % 16;
    };

    set(key, value){
        const index = this.hash(key)
        const currentBucket = this.buckets[index]
        if(currentBucket.length > 0){
            for(const keyValuePair of currentBucket){
                if(keyValuePair.key === key){
                    keyValuePair.value = value
                    return
                }
            }
            currentBucket.push({key:key, value:value})
        }else{
            currentBucket.push({key:key, value:value})
        }
        if(!this.populatedBuckets.includes(index)){
            this.populatedBuckets.push(index)
        }
        if(!this.currentKeys.includes(key)){
            this.currentKeys.push(key)
        }
        this.currentValues.push(value)
    }

    get(key){
        const index = this.hash(key);
        for (const keyValuePair of this.buckets[index]) {
           if(keyValuePair.key === key){
                return keyValuePair.value;
           }
        }
        return null;
    }


    has(key){
        const index = this.hash(key)
        for(const keyValuePair of this.buckets[index]){
            if(keyValuePair.key === key){
                return true
            }
        }return false;
    }

    remove(key){
        const index = this.hash(key)
        let value;
        for(const keyValuePair of this.buckets[index]){
            if(keyValuePair.key === key){
                value = keyValuePair.value
                const indexOf = this.buckets[index].indexOf(keyValuePair)
                this.buckets[index].splice(indexOf, 1)
            }
        }
        if(this.buckets[index].length === 0){
            this.populatedBuckets.splice(this.populatedBuckets.indexOf(index), 1)
        }
        this.currentKeys.splice(this.currentKeys.indexOf(key), 1)
        this.currentValues.splice(this.currentValues.indexOf(value), 1)
    }

    length(){
        let storedKeys = 0
        for(const index of this.populatedBuckets){
            console.log(this.populatedBuckets)
            console.log(this.buckets[index])
            storedKeys += this.buckets[index].length
        }
        return storedKeys
    }

    clear(){
        this.buckets = Array(16).fill().map(() => []);
    }

    keys(){
        return this.currentKeys
    }

    values(){
        return this.currentValues
    }

    entries(){
        let entries = [];
        for(let i = 0; i < this.currentKeys.length; i++){
            entries.push([this.currentKeys[i], this.currentValues[i]])
        }
        return entries
    }

}



const myMap = new hashMap()



myMap.set('SIEMANO', 'SIEMANKO')
myMap.set('SIEMNOA', 'SIEMANKO')
myMap.set('SIEMNOA1', 'SIEMANKO22')

console.log(myMap.get('SIEMANO'));
console.log(myMap.has('SIEMANO2'))
console.log(myMap.remove('SIEMANO'))
myMap.set('SIEMNOA2', 'SIEMANKO22')
myMap.set('SIEMNOA3', 'SIEMANKO22')
myMap.set('SIEMNOA4', 'SIEMANKO22')
console.log(myMap.length())



console.log(myMap.keys())
console.log(myMap.values())
console.log(myMap.entries())



