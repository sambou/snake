function advance() {
  return { type: 'ADVANCE' };
}

function restart() {
  return { type: 'RESTART' };
}

function changeDirection(direction) {
  return { type: 'CHANGE_DIRECTION', direction };
}

function goLeft() {
  return changeDirection('left');
}

function goRight() {
  return changeDirection('right');
}

function goUp() {
  return changeDirection('up');
}

function goDown() {
  return changeDirection('down');
}

module.exports = { advance, restart, goLeft, goRight, goUp, goDown };
