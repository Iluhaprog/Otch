import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.clickHandler(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function SaveButton(props) {
    return (
        <button onClick={props.onClick}>{props.value}</button>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            saveList: Array(9).fill(null),
        };
    }

    handleSaveButtonClick(i) {
        this.setState({
            squares: this.state.saveList[i],
            saveList: this.state.saveList.slice(0, i + 1)
        });
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        const saveList = this.state.saveList.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0';
        saveList.push(squares);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            saveList: saveList,
        });
    }


    render() {
        let status = 'Next player:' + (this.state.xIsNext ? 'X' : '0');
        const winner = calculateWinner(this.state.squares);
        if (winner) {
            status = `!!!Win ${winner}!!!;`;
        } else {
            status += ';\nWinner not found;';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} clickHandler={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.saveList.map((el, index) => {
                        return el ? (
                            <SaveButton 
                                value={el.join('-')} 
                                onClick={() => {this.handleSaveButtonClick(index)}}
                                key={index}
                                />
                        ) : '';
                    })}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
