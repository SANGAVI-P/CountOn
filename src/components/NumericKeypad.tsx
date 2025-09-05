import { Button } from "@/components/ui/button";

type NumericKeypadProps = {
  onKeyPress: (key: string) => void;
};

const NumericKeypad = ({ onKeyPress }: NumericKeypadProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button variant="destructive" className="text-lg h-12" onClick={() => onKeyPress('C')}>C</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('(')}>(</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress(')')}>)</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('/')}>/</Button>

      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('7')}>7</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('8')}>8</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('9')}>9</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('*')}>*</Button>

      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('4')}>4</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('5')}>5</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('6')}>6</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('-')}>-</Button>

      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('1')}>1</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('2')}>2</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('3')}>3</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('+')}>+</Button>

      <Button variant="outline" className="text-lg h-12 col-span-2" onClick={() => onKeyPress('0')}>0</Button>
      <Button variant="outline" className="text-lg h-12" onClick={() => onKeyPress('.')}>.</Button>
      <Button className="text-lg h-12" onClick={() => onKeyPress('=')}>=</Button>
    </div>
  );
};

export default NumericKeypad;