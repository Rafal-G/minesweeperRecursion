import { Node } from './node.js';

const _ = 'empty'
const M = 'mine'
/*
 * I'm representing the board using a simple two dimensional array. The Mines are represented with the
 * M const and empty spaces are represented with the _
 *
 * I've "hard coded" the board.
 */
const board = [
    [_, M, _, _, _, M, _, _, _, _],
    [_, M, _, _, _, M, _, _, M, _],
    [_, M, _, _, M, M, _, _, _, _],
    [M, M, _, _, _, M, M, M, M, M],
    [_, _, _, _, _, _, _, _, _, M],
    [_, M, _, M, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, M, _, _, _, _, _, _, _],
    [M, M, _, _, _, _, _, _, _, _],
    [_, M, _, _, _, _, _, _, _, _]
]

/*
 * const origin = new Node(5, 5) is somewhere in the middle, the large area of empty spaces,
 * I expect there to be 63 spaces when starting in the middle.
 *
 * The recursion is working because if you change one of the empty spaces (_) to a mine (M) the traversal count decreases
 * as expected.
 *
 * If you open the box of Ms in the top right of the board with a _ the count will increase a lot.
 *
 * If you want to start in the top left corner change origin to be const origin = new Node(0,0);
 * here I expect the total traversed to equal 3 since that corner is boxed in with mines.
 *
 * If you want to start in the top right corner change origin to be const origin = new Node(0,9)
 * here I expect the total traversed to equal 11 because there are 11 empty spaces.
 *
 * If you want to start in the bottom left corner change origin to be const origin = new Node(9,0)
 * here I expect there to be only one valid move because that block is surrounded by mines
 *
 * If you start the origin on a mine for example (const origin = new Node(0,1)), there will be no traversals.
 */
const origin = new Node(5,5);

const MAX_X = 10
const MAX_Y = 10
const traversed = []

function traverseBoard(node, board, traversed) {

    // Check if we are out of bounds
    if(node.x < 0 || node.x >= MAX_X || node.y < 0 || node.y >= MAX_Y) {
        return
    }

    // Don't traverse nodes we have already traversed
    if(traversed.includes(`${node.x}:${node.y}`)) {
        return
    }

    // Check to see if we are on a mine
    if(board[node.x][node.y] === M) {
        return
    }

    traversed.push(`${node.x}:${node.y}`)

    traverseBoard(new Node(node.x + 1, node.y), board, traversed)
    traverseBoard(new Node(node.x + 1, node.y + 1), board, traversed)
    traverseBoard(new Node(node.x + 1, node.y - 1 ), board, traversed)
    traverseBoard(new Node(node.x, node.y + 1), board, traversed)
    traverseBoard(new Node(node.x, node.y - 1), board, traversed)
    traverseBoard(new Node(node.x - 1, node.y), board, traversed)
    traverseBoard(new Node(node.x - 1, node.y + 1), board, traversed)
    traverseBoard(new Node(node.x - 1, node.y - 1), board, traversed)
}

traverseBoard(origin, board, traversed)
console.log('traversed', traversed)
console.log('amount of spaces traversed', traversed.length)
