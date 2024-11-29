const blockType = {
  wall: 1,
  path: 0,
  visited: -1,
  mouse: 2,
  cheese: 3,
};
let curr = {
  x: 0,
  y: 0,
};
const arr = [
  [0, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 3, 1, 0, 1, 1],
  [0, 0, 0, 3, 1, 0, 1, 1],
  [0, 0, 0, 3, 1, 0, 1, 1],
  [0, 0, 0, 3, 1, 0, 1, 1],
  [0, 0, 0, 3, 1, 0, 1, 1],
];

function drawMaze() {
  arr[curr.x][curr.y] = blockType.mouse;
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    html += '<div class="row">';
    for (let j = 0; j < arr[i].length; j++) {
      switch (arr[i][j]) {
        case blockType.wall:
          html += '<div class="cell wall"></div>';
          break;
        case blockType.path:
          html += '<div class="cell"></div>';
          break;
        case blockType.visited:
          html += '<div class="cell">V</div>';
          break;
        case blockType.mouse:
          html += '<div class="cell mouse"></div>';
          break;
        case blockType.cheese:
          html += '<div class="cell cheese"></div>';
          break;
      }
    }
    html += "</div>";
  }
  document.querySelector(".maze").innerHTML = html;
  arr[curr.x][curr.y] = blockType.visited;
}

drawMaze();
setInterval(move, 1000);

function getBlocktypeAt(pos) {
  if (pos === null) return null;
  return arr[pos.x][pos.y];
}

function move() {
  let down = getDown();
  if (getBlocktypeAt(down) === 0) {
    curr = down;
    return drawMaze();
  }

  let right = getRight();
  if (getBlocktypeAt(right) === 0) {
    curr = right;
    return drawMaze();
  }
  let left = getLeft();
  if (getBlocktypeAt(left) === 0) {
    curr = left;
    return drawMaze();
  }
  let up = getUp();
  if (getBlocktypeAt(up) === 0) {
    curr = up;
    return drawMaze();
  }
}

function getLeft() {
  if (curr.y == 0) return null;
  return {
    x: curr.x,
    y: curr.y - 1,
  };
}
function getRight() {
  if (curr.y == arr[0].length - 1) return null;
  return {
    x: curr.x,
    y: curr.y + 1,
  };
}
function getUp() {
  if (curr.x == 0) return null;
  return {
    x: curr.x - 1,
    y: curr.y,
  };
}
function getDown() {
  if (curr.x == arr.length - 1) return null;
  return {
    x: curr.x + 1,
    y: curr.y,
  };
}
