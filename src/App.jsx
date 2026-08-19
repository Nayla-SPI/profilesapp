import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 'Error' : a / b;
      default: return b;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(result);
    }

    setWaitingForSecond(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && firstValue !== null) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const buttons = [
    ['C', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
  ];

  const handleClick = (label) => {
    if (label === 'C') return clear();
    if (label === '=') return handleEquals();
    if (['+', '-', '×', '÷'].includes(label)) return handleOperator(label);
    if (label === '.') return inputDecimal();
    return inputDigit(label);
  };

  return (
    <div className="card" style={{ maxWidth: 320, margin: '0 auto' }}>
      <h1>Calculator</h1>
      <div
        style={{
          background: '#1e1e1e',
          color: '#fff',
          fontSize: '2rem',
          textAlign: 'right',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          overflowX: 'auto',
        }}
      >
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {buttons.flat().map((label, i) => (
          <button
            key={i}
            onClick={() => handleClick(label)}
            style={{
              padding: '1rem',
              fontSize: '1.2rem',
              gridColumn: label === '0' ? 'span 2' : undefined,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
