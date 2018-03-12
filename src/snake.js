const { initInput, render } = require('./view/terminal');
const { reducer, initialState } = require('./logic/reducer');
const { advance } = require('./logic/actions');
const { GAME_SPEED } = require('./config');

function startGame() {
  let state = initialState;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function loop() {
    if (state.status !== 'over') {
      dispatch(advance());
    }
    render(state);
  }

  initInput(dispatch);
  setInterval(loop, GAME_SPEED);
}

startGame();
