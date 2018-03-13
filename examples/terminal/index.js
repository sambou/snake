const { initInput } = require('./input');
const render = require('./render');
const { GAME_SPEED } = require('./config');
const { reducer, initialState, actions } = require('snake');

function startGame() {
  let state = initialState;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function loop() {
    if (state.status !== 'over') {
      dispatch(actions.advance());
    }
    render(state);
  }

  initInput(dispatch);
  setInterval(loop, GAME_SPEED);
}

startGame();
