import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Calculator = () => {
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
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        if (second === 0) return "Error";
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (displayValue === "Error") return;
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const clearAll = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const buttonClasses = "text-xl h-14 transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95";

  return (
    <Card className="w-full max-w-xs mx-auto shadow-lg animate-pop-in bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-center">AI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/80 rounded-md p-4 text-right text-4xl font-mono mb-4 overflow-x-auto break-all h-20 flex items-end justify-end">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="destructive" className={`col-span-4 ${buttonClasses}`} onClick={clearAll}>
            AC
          </Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("7")}>7</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("8")}>8</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("9")}>9</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("/")}>÷</Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("4")}>4</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("5")}>5</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("6")}>6</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("*")}>×</Button>

          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("1")}>1</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("2")}>2</Button>
          <Button variant="secondary" className={buttonClasses} onClick={() => inputDigit("3")}>3</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("-")}>-</Button>

          <Button variant="secondary" className={`col-span-2 ${buttonClasses}`} onClick={() => inputDigit("0")}>0</Button>
          <Button variant="secondary" className={buttonClasses} onClick={inputDecimal}>.</Button>
          <Button variant="outline" className={buttonClasses} onClick={() => performOperation("+")}>+</Button>
          
          <Button className={`col-span-4 ${buttonClasses}`} onClick={handleEquals}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;