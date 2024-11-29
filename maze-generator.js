function generateMaze(width, height) {
  // Create a 2D array to represent the maze
  const maze = [];
  for (let i = 0; i < height; i++) {
    maze[i] = new Array(width).fill(1); // 1 represents a wall
  }

  // Recursive backtracking algorithm
  function carvePassages(x, y) {
    const directions = [
      [0, -2],
      [2, 0],
      [0, 2],
      [-2, 0],
    ]; // Up, Right, Down, Left
    shuffle(directions); // Randomize directions

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        maze[ny][nx] === 1
      ) {
        maze[ny][nx] = 0; // Mark as passage
        maze[y + dy / 2][x + dx / 2] = 0; // Mark connecting cell
        carvePassages(nx, ny);
      }
    }
  }

  // Start carving from a random cell
  const startX = Math.floor(Math.random() * (width - 2)) + 1;
  const startY = Math.floor(Math.random() * (height - 2)) + 1;
  carvePassages(startX, startY);

  return maze;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
