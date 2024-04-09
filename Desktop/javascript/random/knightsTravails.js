const chessboard = [
    [0,1,2,3,4,5,6,7], //0
    [0,1,2,3,4,5,6,7], //1
    [0,1,2,3,4,5,6,7], //2
    [0,1,2,3,4,5,6,7], //3
    [0,1,2,3,4,5,6,7], //4
    [0,1,2,3,4,5,6,7], //5
    [0,1,2,3,4,5,6,7], //6
    [0,1,2,3,4,5,6,7]  //7
]

class Tile{
    static instances = []
    constructor(location){
        this.location = location
        this.moves = this.getTileMoves()
        Tile.instances.push(this)
    }

    getTileMoves(){
        let possibleMoves = [];
        const x = this.location[1]
        const y = this.location[0]
        
        try {
            if (chessboard[y - 2] && chessboard[y - 2][x - 1]) {
                possibleMoves.push([y - 2 , x - 1]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y - 2] && chessboard[y - 2][x + 1]) {
                possibleMoves.push([y - 2, x + 1]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y - 1] && chessboard[y - 1][x - 2]) {
                possibleMoves.push([y - 1, x - 2]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y - 1] && chessboard[y - 1][x + 2]) {
                possibleMoves.push([y - 1, x + 2]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y + 1] && chessboard[y + 1][x - 2]) {
                possibleMoves.push([y + 1, x - 2]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y + 1] && chessboard[y + 1][x + 2]) {
                possibleMoves.push([y + 1, x + 2]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y + 2] && chessboard[y + 2][x - 1]) {
                possibleMoves.push([y + 2, x - 1]);
            }
        } catch (error) {}
        
        try {
            if (chessboard[y + 2] && chessboard[y + 2][x + 1]) {
                possibleMoves.push([y + 2, x + 1]);
            }
        } catch (error) {}
        return possibleMoves
    }
}

for(const y of chessboard){
    for(const x of y){
        const newTile = new Tile([chessboard.indexOf(y),x])
    }
}

console.log(Tile.instances)

function findTileObject(location){
    for(const tile of Tile.instances){
        if(tile.location[0] === location[0] && tile.location[1] === location[1]){
            return tile
        }
    }
}

//GOOFY SOLUTION 

// function getCloser(endLocation, moves){
//     const endSum = endLocation[0] + endLocation[1]
//     let bestMove = null;
//     let currentBestSum = null;
//     for(const move of moves){
//         if(Math.abs((endSum - (move[0] + move[1]))) < currentBestSum || currentBestSum === null){
//             currentBestSum = Math.abs((endSum - (move[0] + move[1])))
//             bestMove = findTileObject(move)
//         }
//     }
//     return bestMove
// }

// function knightMoves(startLocation, endLocation) {
//     const startTile = findTileObject(startLocation)
//     const endTile = findTileObject(endLocation)
//     let currentTile = startTile;
//     let moves = 1;
//     while(!currentTile.moves.some(move => JSON.stringify(move) === JSON.stringify(endTile.location))){
//         currentTile = getCloser(endLocation, currentTile.moves);
//         moves++;
//     }
//     return moves
// }


// GPT SOLUTION


function knightMoves(startLocation, endLocation) {
    // Initialize queue for BFS traversal and set to keep track of visited cells
    const queue = [];
    const visited = new Set();

    // Enqueue startLocation and mark it as visited
    queue.push({ location: startLocation, path: [startLocation] });
    visited.add(JSON.stringify(startLocation));

    while (queue.length > 0) {
        const { location, path } = queue.shift();
        // Check if endLocation is reached
        if (location[0] === endLocation[0] && location[1] === endLocation[1]) {
            return path.length - 1; // Subtract 1 to get the number of moves
        }


        for (const move of findTileObject(location).moves) {
            const moveString = JSON.stringify(move);
            
            if (!visited.has(moveString)) {
                queue.push({ location: move, path: [...path, move] });
                visited.add(moveString);
            }
        }
    }
}

console.log(knightMoves([5,5], [4,2])) // Output: 2
console.log(knightMoves([1, 1], [3, 2])); // Output: 1
console.log(knightMoves([1, 1], [3, 2])); // Output: 1
console.log(knightMoves([7, 7], [5, 6])); // Output: 2
console.log(knightMoves([2, 2], [6, 6])); // Output: 4
console.log(knightMoves([0, 0], [7, 7]))
