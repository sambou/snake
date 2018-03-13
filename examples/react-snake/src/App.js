import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'snake';
import './App.css';

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37: {
          this.props.onGoLeft();
          break;
        }
        case 38: {
          this.props.onGoUp();
          break;
        }
        case 39: {
          this.props.onGoRight();
          break;
        }
        case 40: {
          this.props.onGoDown();
          break;
        }
        case 82: {
          this.props.onRestart();
          break;
        }
        default:
          break;
      }
    });

    setInterval(() => {
      if (this.props.status !== 'over') {
        this.props.onAdvance();
      }
    }, 150);
  }

  render() {
    const { tail, items, status, score } = this.props;

    return (
      <div className="App">
        <svg width="400px" height="400px" xmlns="http://www.w3.org/2000/svg">
          <rect fill="grey" opacity="0.1" x={0} y={0} width="100%" height="100%" />
          {tail.map(({ x, y }, i) => <rect key={i} x={x * 40} y={y * 40} width={40} height={40} />)}
          {items.map(({ x, y }, i) => <rect key={i} x={x * 40} y={y * 40} width={40} height={40} fill="green" />)}
        </svg>
        {status === 'over' && <h1>Game Over</h1>}
        <h2>Score: {score}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdvance: dispatch.bind(null, actions.advance()),
    onGoLeft: dispatch.bind(null, actions.goLeft()),
    onGoRight: dispatch.bind(null, actions.goRight()),
    onGoUp: dispatch.bind(null, actions.goUp()),
    onGoDown: dispatch.bind(null, actions.goDown()),
    onRestart: dispatch.bind(null, actions.restart()),
  };
};

export default connect(id => id, mapDispatchToProps)(App);
