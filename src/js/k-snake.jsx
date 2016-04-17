import React from 'react';
import _ from 'lodash';
import { findNextPostion } from './utils';

import {
  mapValueToType,
  Types,
  Direction,
  ValidKeys
} from './constants';

require('../css/k-snake.css');

const KSnake = React.createClass({
  propTypes: {
    rows: React.PropTypes.number,
    cols: React.PropTypes.number,
    startPosition: React.PropTypes.number
  },

  getInitialState() {
    const startPosition = this.props.startPosition;
    const { cols, rows } = this.props;

    return {
      snake: [startPosition], // [Head, Head-1, ..., Tail]
      board: Array(cols*rows).fill(Types.Blank),// [0,1, 2, .., cols * rows]
      snakeLength: 0,
      gameOver: false,
      direction: Direction.right
    };
  },

  getDefaultProps() {
    return {
      rows: 25,
      cols: 25,
      startPosition: 2
    };
  },

  cellTypeAt(row, col) {
    const { cols } = this.props;
    const value = this.state.board[cols * row + col];

    return mapValueToType[value];
  },

  renderBoard() {
    const { rows, cols } = this.props;
    const cellSize = 30;

    return (
      <div
        className="snake-board"
        ref="board"
        onKeyDown={this.handleKeyDown}
        style={{width: cols * cellSize, height: rows * cellSize}}>
        {_.range(rows).map(row =>
          _.range(cols).map(col =>
            <div className={this.cellTypeAt(row, col)} key={`${row}-${col}`} />
        ))}
      </div>
    );
  },

  renderScoreLabel() {
    return (
      <div className="score">
        Score: {this.state.snake.length}
      </div>
    );
  },

  render() {
    return (
      <div className="snake-game">
        <div className="header">Kolo Snake Game</div>
        <div>
          {this.renderScoreLabel()}
          {this.renderBoard()}
        </div>
      </div>
    );
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.startGame();
  },


  detectIfSnakeWillEatFoodOrNot(nextHeadPosition) {
    const { board, snake } = this.state;
    const  { cols, rows } = this.props;

    if (board[nextHeadPosition] === Types.Food || snake.length === 1) {
      //update new food cell 's position'
      let ii;
      let cells = cols * rows;
      do {
        ii = Math.floor(Math.random() * cells);
      } while (board[ii] !== Types.Blank);

      board[ii] = Types.Food;
    } else {
      board[snake.pop()] = Types.Blank;
    }
    return board;
  },


  handleKeyDown(event) {
    var direction = event.keyCode;
    var difference = Math.abs(this.state.direction - direction);

    if (ValidKeys[direction] && difference !== 0 && difference !== 2) {
      this._nextDirection = direction;
    }
  },


  startGame() {
    let {
      snake,
      board,
      direction
    } = this.state;

    const { rows, cols } = this.props;


    let currentHeadPosition = snake[0];
    let nextHeadPosition = findNextPostion(currentHeadPosition, direction, rows, cols);

    if (snake.indexOf(nextHeadPosition) != -1) {
      this.setState({gameOver: true});
      return;
    }

    //detect if nextHeadPosition is Food
    board = this.detectIfSnakeWillEatFoodOrNot(nextHeadPosition);

    //Update new position
    snake.unshift(nextHeadPosition);
    board[nextHeadPosition] = Types.Snake;

    if (this._nextDirection) {
      direction = this._nextDirection;
      this._nextDirection = null;
    }

    this.setState({
      snake: snake,
      board: board,
      direction: direction,
      snakeHead: nextHeadPosition
    });

    setTimeout(this.startGame, 100);
  }
});


export default KSnake;
