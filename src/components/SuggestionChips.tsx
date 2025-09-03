import { Badge } from "@/components/ui/badge";

type SuggestionChipsProps = {
  onSelectSuggestion: (suggestion: string) => void;
};

const suggestions = [
  "sqrt(144) + 2^3",
  "15% of 300",
  "5 feet to cm",
  "cos(45 deg)",
  "1 BTC in USD",
  "1998-03-24 to days",
];

const SuggestionChips = ({ onSelectSuggestion }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
      {suggestions.map((suggestion) => (
        <Badge
          key={suggestion}
          variant="outline"
          className="cursor-pointer hover:bg-accent"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </Badge>
      ))}
    </div>
  );
};

export default SuggestionChips;