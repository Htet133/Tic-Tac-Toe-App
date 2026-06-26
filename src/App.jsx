import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const currentSymbol = xIsNext ? 'X' : 'O';
  const playerNames = {
    X: playerX.trim() || 'Player X',
    O: playerO.trim() || 'Player O',
  };

  let status;
  if (winner) {
    status = 'Winner: ' + playerNames[winner] + ' (' + winner + ')';
  } else if (isDraw) {
    status = 'Draw game';
  } else {
    status = 'Next player: ' + playerNames[currentSymbol] + ' (' + currentSymbol + ')';
  }

  function handleStart(event) {
    event.preventDefault();
    setGameStarted(true);
    handleRestart();
    setScores({ X: 0, O: 0 });
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = currentSymbol;
    const nextWinner = calculateWinner(nextSquares);

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (nextWinner) {
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner]: currentScores[nextWinner] + 1,
      }));
    }
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  if (!gameStarted) {
    return (
      <main className="game-board">
        <h1>Tic Tac Toe</h1>
        <form className="start-form" onSubmit={handleStart}>
          <label>
            Player X name
            <input
              type="text"
              value={playerX}
              onChange={(event) => setPlayerX(event.target.value)}
              placeholder="Player X"
            />
          </label>

          <label>
            Player O name
            <input
              type="text"
              value={playerO}
              onChange={(event) => setPlayerO(event.target.value)}
              placeholder="Player O"
            />
          </label>

          <button className="restart-button" type="submit">
            Start Game
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="game-board">
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <div>
          <strong>{playerNames.X}</strong>
          <span>X wins: {scores.X}</span>
        </div>
        <div>
          <strong>{playerNames.O}</strong>
          <span>O wins: {scores.O}</span>
        </div>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>

      <div className="actions">
        <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
        <button className="secondary-button" onClick={() => setGameStarted(false)}>
          Change Players
        </button>
      </div>
    </main>
  );
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
