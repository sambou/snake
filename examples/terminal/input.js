const readline = require('readline');
const { actions: { restart, goUp, goDown, goLeft, goRight } } = require('snake');
const { KEYS } = require('./config');

function initInput(dispatch) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    switch (key.name) {
      case KEYS.UP: {
        dispatch(goUp());
        break;
      }
      case KEYS.LEFT: {
        dispatch(goLeft());
        break;
      }
      case KEYS.DOWN: {
        dispatch(goDown());
        break;
      }
      case KEYS.RIGHT: {
        dispatch(goRight());
        break;
      }
      case KEYS.RESTART: {
        dispatch(restart());
        break;
      }
      case KEYS.EXIT: {
        process.exit();
        break;
      }
      default:
        return;
    }
  });
}

module.exports = { initInput };
