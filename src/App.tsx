import { useState } from 'react';
import { Delete } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const maxDigits = 10;

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      if (display.replace(/[^0-9]/g, '').length >= maxDigits) {
        return;
      }
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      let displayValue = String(newValue);
      if (displayValue.length > maxDigits + 2) {
        displayValue = newValue.toExponential(6);
      }

      setDisplay(displayValue);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (operation && previousValue !== null) {
      const currentValue = previousValue;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      let displayValue = String(newValue);
      if (displayValue.length > maxDigits + 2) {
        displayValue = newValue.toExponential(6);
      }

      setDisplay(displayValue);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({
    value,
    onClick,
    className = '',
    span = false
  }: {
    value: string | React.ReactNode;
    onClick: () => void;
    className?: string;
    span?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`
        h-16 rounded-lg font-semibold text-lg transition-all duration-200
        active:scale-95 hover:brightness-110
        ${className}
        ${span ? 'col-span-2' : ''}
      `}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-6 border border-blue-900/30">
          <div className="mb-6 bg-black/50 rounded-2xl p-6 border border-blue-800/30">
            <div className="text-blue-400/60 text-sm mb-2 text-right font-mono">
              {operation && previousValue !== null ? `${previousValue} ${operation}` : '\u00A0'}
            </div>
            <div className="text-white text-4xl font-bold text-right font-mono tracking-wider break-all">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button
              value="AC"
              onClick={clearAll}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
            <Button
              value="C"
              onClick={clear}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
            <Button
              value={<Delete size={20} />}
              onClick={backspace}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            />
            <Button
              value="÷"
              onClick={() => performOperation('÷')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />

            <Button
              value="7"
              onClick={() => inputDigit('7')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="8"
              onClick={() => inputDigit('8')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="9"
              onClick={() => inputDigit('9')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="×"
              onClick={() => performOperation('×')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />

            <Button
              value="4"
              onClick={() => inputDigit('4')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="5"
              onClick={() => inputDigit('5')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="6"
              onClick={() => inputDigit('6')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="-"
              onClick={() => performOperation('-')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />

            <Button
              value="1"
              onClick={() => inputDigit('1')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="2"
              onClick={() => inputDigit('2')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="3"
              onClick={() => inputDigit('3')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="+"
              onClick={() => performOperation('+')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />

            <Button
              value="0"
              onClick={() => inputDigit('0')}
              className="bg-gray-800 hover:bg-gray-700 text-white"
              span={true}
            />
            <Button
              value="."
              onClick={inputDecimal}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            />
            <Button
              value="="
              onClick={handleEquals}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>
        </div>

        <div className="text-center mt-4 text-blue-300/60 text-sm">
          10桁まで計算可能
        </div>
      </div>
    </div>
  );
}

export default App;
