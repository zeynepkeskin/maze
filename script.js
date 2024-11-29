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

let maze = generateMaze(8, 8);
putCheese();
function putCheese() {
  for (let i = maze.length - 1; i > -1; i--) {
    for (let j = maze[i].length - 1; j > -1; j--) {
      if (maze[i][j] === blockType.path) {
        maze[i][j] = blockType.cheese;
        return;
      }
    }
  }
}

function drawMaze() {
  maze[curr.x][curr.y] = blockType.mouse;
  let html = "";
  for (let i = 0; i < maze.length; i++) {
    html += '<div class="row">';
    for (let j = 0; j < maze[i].length; j++) {
      switch (maze[i][j]) {
        case blockType.wall:
          html += '<div class="cell wall"></div>';
          break;
        case blockType.path:
          html += '<div class="cell"></div>';
          break;
        case blockType.visited:
          html += '<div class="cell"></div>';
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
  maze[curr.x][curr.y] = blockType.visited;
}

drawMaze();
setInterval(move, 1000);

function getBlocktypeAt(pos) {
  if (pos === null) return null;
  return maze[pos.x][pos.y];
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
  if (curr.y == maze[0].length - 1) return null;
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
  if (curr.x == maze.length - 1) return null;
  return {
    x: curr.x + 1,
    y: curr.y,
  };
}
