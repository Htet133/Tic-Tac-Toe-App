import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} 
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    // ၂။ တစ်ယောက်ယောက် နိုင်သွားရင် သို့မဟုတ် အကွက်ထဲမှာ စာရှိပြီးသားဆိုရင် ဆက်နှိပ်လို့မရအောင် ပိတ်လိုက်တာပါ ⛔
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }


  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }


  return (
    <div className="game-board">
      <div className="status">{status}</div>

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
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // အလျားလိုက်
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // အထေါင်လိုက်
    [0, 4, 8], [2, 4, 6]             // ထောင့်ဖြတ်
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' သို့မဟုတ် 'O' နိုင်တယ်ဆိုပြီး ပြန်ပေးမယ်
    }
  }
  return null;
}
