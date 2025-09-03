import { Button } from "@/components/ui/button";

type ScientificKeypadProps = {
  onKeyPress: (key: string) => void;
};

const scientificKeys = [
  { display: "sin", value: "sin()" },
  { display: "cos", value: "cos()" },
  { display: "tan", value: "tan()" },
  { display: "log", value: "log()" },
  { display: "ln", value: "ln()" },
  { display: "√", value: "sqrt()" },
  { display: "x²", value: "^2" },
  { display: "xʸ", value: "^" },
  { display: "(", value: "(" },
  { display: ")", value: ")" },
  { display: "π", value: "pi" },
  { display: "e", value: "e" },
];

const ScientificKeypad = ({ onKeyPress }: ScientificKeypadProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {scientificKeys.map((key) => (
        <Button
          key={key.display}
          variant="outline"
          className="text-lg h-12"
          onClick={() => onKeyPress(key.value)}
        >
          {key.display}
        </Button>
      ))}
    </div>
  );
};

export default ScientificKeypad;