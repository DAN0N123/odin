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

function knightMoves(startLocation, endLocation) {
    const startTile = findTileObject(startLocation)
    const endTile = findTileObject(endLocation)
    console.log(startTile, endTile)

    

    if (startTile.moves.some(move => JSON.stringify(move) === JSON.stringify(endTile.location))) {
        console.log('1 move');
    }
}

knightMoves([2,2],[4,3])

