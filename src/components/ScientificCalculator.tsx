import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScientificCalculator = () => {
  const [displayValue, setDisplayValue] = React.useState("0");
  const [firstOperand, setFirstOperand] = React.useState<number | null>(null);
  const [operator, setOperator] = React.useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = React.useState(false);

  const inputDigit = (digit: string) => {
    if (displayValue === "Error") return;
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (displayValue === "Error") return;
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const performOperation = (nextOperator: string) => {
    if (displayValue === "Error") return;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultString = String(result);
      setDisplayValue(resultString);
      setFirstOperand(result === "Error" ? null : parseFloat(resultString));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number | string => {
    switch (op) {
      case "+": return first + second;
      case "-": return first - second;
      case "*": return first * second;
      case "/": return second === 0 ? "Error" : first / second;
      case "^": return Math.pow(first, second);
      default: return second;
    }
  };

  const handleEquals = () => {
    if (displayValue === "Error" || !operator || firstOperand === null) return;
    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearAll = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleScientific = (func: string) => {
    if (displayValue === "Error") return;
    const value = parseFloat(displayValue);
    let result: number | string;
    switch (func) {
      case "sqrt": result = value < 0 ? "Error" : Math.sqrt(value); break;
      case "sq": result = Math.pow(value, 2); break;
      case "sin": result = Math.sin((value * Math.PI) / 180); break;
      case "cos": result = Math.cos((value * Math.PI) / 180); break;
      case "tan": result = Math.tan((value * Math.PI) / 180); break;
      case "log": result = value <= 0 ? "Error" : Math.log10(value); break;
      case "ln": result = value <= 0 ? "Error" : Math.log(value); break;
      case "pi": setDisplayValue(String(Math.PI)); return;
      default: result = value;
    }
    setDisplayValue(String(result));
    setWaitingForSecondOperand(true);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') inputDigit(event.key);
      if (event.key === '.') inputDecimal();
      if (event.key === 'Enter' || event.key === '=') handleEquals();
      if (event.key === 'Backspace') setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
      if (event.key === 'Escape') clearAll();
      if (event.key === '+') performOperation('+');
      if (event.key === '-') performOperation('-');
      if (event.key === '*') performOperation('*');
      if (event.key === '/') performOperation('/');
      if (event.key === '^') performOperation('^');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, firstOperand, operator, waitingForSecondOperand]);

  const buttonClasses = "text-lg h-12 transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95";

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-center">Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/80 rounded-md p-4 text-right text-4xl font-mono mb-4 overflow-x-auto break-all h-20 flex items-end justify-end">
          {displayValue}
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('sin')}>sin</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('cos')}>cos</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('tan')}>tan</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('log')}>log</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('ln')}>ln</Button>

          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('sqrt')}>√</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('sq')}>x²</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation('^')}>xʸ</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => handleScientific('pi')}>π</Button>
          <Button variant="destructive" className={buttonClasses} onClick={clearAll}>AC</Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("7")}>7</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("8")}>8</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("9")}>9</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("/")}>÷</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("*")}>×</Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("4")}>4</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("5")}>5</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("6")}>6</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("-")}>-</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("+")}>+</Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("1")}>1</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("2")}>2</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("3")}>3</Button>
          <Button variant="secondary" className={`row-span-2 ${buttonClasses}`} onClick={() => inputDigit("0")}>0</Button>
          <Button className={`row-span-2 ${buttonClasses}`} onClick={handleEquals}>=</Button>

          <Button variant="secondary" className={buttonClasses} onClick={inputDecimal}>.</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScientificCalculator;