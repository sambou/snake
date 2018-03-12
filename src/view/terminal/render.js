const { WIDTH, HEIGHT, KEYS } = require('../../config');
const { range } = require('ramda');

function render(state) {
  // clear screen
  process.stdout.write('\033c');

  // generate grid
  const grid = range(0, HEIGHT).map(i => range(0, WIDTH).map(_ => '.'));

  // render player
  state.tail.forEach(({ x, y }) => (grid[y][x] = '◼︎'));

  // render items
  state.items.forEach(({ x, y }) => (grid[y][x] = '⦿'));

  // render all rows
  for (let row of grid) {
    process.stdout.write(row.join(' ') + '\n');
  }

  process.stdout.write(`Score: ${state.score}\n`);

  if (state.status === 'over') {
    process.stdout.write(`Game Over! Try again with [${KEYS.RESTART}]\n`);
  }

  process.stdout.write(`Exit with [${KEYS.EXIT}]`);
}

module.exports = render;
