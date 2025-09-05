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
  { display: "√", value: "√()" },
  { display: "x²", value: "^2" },
  { display: "xʸ", value: "^" },
  { display: "π", value: "pi" },
  { display: "e", value: "e" },
  { display: "x", value: "x" },
];

const ScientificKeypad = ({ onKeyPress }: ScientificKeypadProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {scientificKeys.map((key) => (
        <Button
          key={key.display}
          variant="secondary"
          className="text-lg h-12 transition-transform duration-100 ease-out hover:scale-105 active:scale-95"
          onClick={() => onKeyPress(key.value)}
        >
          {key.display}
        </Button>
      ))}
    </div>
  );
};

export default ScientificKeypad;