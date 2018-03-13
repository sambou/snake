const { assoc, compose, contains, drop, dropLast, pick, prepend, remove } = require('ramda');

const initialState = {
  width: 10,
  height: 10,
  x: 5,
  y: 5,
  tail: [],
  direction: 'left', // 'left' | 'right' | 'up' | 'down'
  status: 'running', // 'running' | 'over'
  score: 0,
  items: [{ x: 3, y: 3 }],
};

const handleAdvance = compose(
  handleAdvancePosition,
  handleEdgeCollision,
  handleItemCollision,
  handleGameOver,
  calculateNextPosition,
);

const getPlayerPos = pick(['x', 'y']);

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADVANCE': {
      return handleAdvance(state);
    }
    case 'CHANGE_DIRECTION': {
      return assoc('direction', action.direction, state);
    }
    case 'RESTART': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

function calculateNextPosition(state) {
  switch (state.direction) {
    case 'left': {
      return assoc('x', state.x - 1, state);
    }
    case 'right': {
      return assoc('x', state.x + 1, state);
    }
    case 'up': {
      return assoc('y', state.y - 1, state);
    }
    case 'down': {
      return assoc('y', state.y + 1, state);
    }
  }
}

function handleItemCollision(state) {
  let item = state.items.findIndex(i => i.x === state.x && i.y === state.y);
  if (item > -1) {
    const items = prepend(getRandomItem(state), remove(item, 1, state.items));

    const tail = prepend(
      {
        x: state.x,
        y: state.y,
      },
      state.tail,
    );

    const score = state.score + 1;

    return Object.assign({}, state, {
      items,
      tail,
      score,
    });
  } else {
    return state;
  }
}

function handleEdgeCollision(state) {
  if (state.x < 0) {
    return assoc('x', state.width - 1, state);
  } else if (state.x >= state.height) {
    return assoc('x', 0, state);
  } else if (state.y < 0) {
    return assoc('y', state.height - 1, state);
  } else if (state.y >= state.width) {
    return assoc('y', 0, state);
  } else {
    return state;
  }
}

function handleAdvancePosition(state) {
  return assoc('tail', prepend(getPlayerPos(state), dropLast(1, state.tail)), state);
}

function handleGameOver(state) {
  if (contains(getPlayerPos(state), drop(1, state.tail))) {
    return assoc('status', 'over', state);
  } else {
    return state;
  }
}

function getRandomItem(state) {
  const pos = {
    x: Math.round((state.width - 1) * Math.random()),
    y: Math.round((state.height - 1) * Math.random()),
  };
  const inPos = contains(pos);

  if (inPos(state.items) || inPos(state.tail)) {
    return getRandomItem(state);
  } else {
    return pos;
  }
}

module.exports = { reducer, initialState };
