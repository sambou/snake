const { compose, contains, drop, dropLast, pick, prepend, remove } = require('ramda');
const { WIDTH, HEIGHT } = require('../config');

const initialState = {
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

function reducer(state, action) {
  switch (action.type) {
    case 'ADVANCE': {
      return handleAdvance(state);
    }
    case 'CHANGE_DIRECTION': {
      return {
        ...state,
        direction: action.direction,
      };
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
      return {
        ...state,
        x: state.x - 1,
      };
    }
    case 'right': {
      return {
        ...state,
        x: state.x + 1,
      };
    }
    case 'up': {
      return {
        ...state,
        y: state.y - 1,
      };
    }
    case 'down': {
      return {
        ...state,
        y: state.y + 1,
      };
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

    return {
      ...state,
      items,
      tail,
      score,
    };
  } else {
    return state;
  }
}

function handleEdgeCollision(state) {
  if (state.x < 0) {
    return { ...state, x: WIDTH - 1 };
  } else if (state.x >= WIDTH) {
    return { ...state, x: 0 };
  } else if (state.y < 0) {
    return { ...state, y: HEIGHT - 1 };
  } else if (state.y >= HEIGHT) {
    return { ...state, y: 0 };
  } else {
    return state;
  }
}

function handleAdvancePosition(state) {
  return {
    ...state,
    tail: prepend(getPlayerPos(state), dropLast(1, state.tail)),
  };
}

function handleGameOver(state) {
  if (contains(getPlayerPos(state), drop(1, state.tail))) {
    return {
      ...state,
      status: 'over',
    };
  } else {
    return state;
  }
}

function getRandomItem(state) {
  const pos = {
    x: Math.round((WIDTH - 1) * Math.random()),
    y: Math.round((HEIGHT - 1) * Math.random()),
  };

  if (contains(pos, state.items) || contains(pos, state.tail)) {
    return getRandomItem(state);
  } else {
    return pos;
  }
}

module.exports = { reducer, initialState };
