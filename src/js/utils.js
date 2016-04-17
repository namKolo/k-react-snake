import { Direction } from './constants';
export function findNextPostion(head, direction, numRows, numCols) {
  // translate index into x/y coords to make math easier
  var x = head % numCols;
  var y = Math.floor(head / numCols);

  // move forward one step in the correct direction, wrapping if needed
  switch (direction) {
    case Direction.up:    y = y <= 0 ? numRows - 1 : y - 1; break;
    case Direction.down:  y = y >= numRows - 1 ? 0 : y + 1; break;
    case Direction.left:  x = x <= 0 ? numCols - 1 : x - 1; break;
    case Direction.right: x = x >= numCols - 1 ? 0 : x + 1; break;
    default: return;
  }

  // translate new x/y coords back into array index
  return (numCols * y) + x;
}


