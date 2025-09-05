import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Calculator, Trash2 } from 'lucide-react'; // Removed Sigma
import { create, all } from 'mathjs';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import SettingsDialog from "./SettingsDialog";
import SuggestionChips from "./SuggestionChips";
import ScientificKeypad from "./ScientificKeypad";
import NumericKeypad from "./NumericKeypad";
import { useIsMobile } from "@/hooks/use-mobile";
import GraphingView from "./GraphingView";
import { toast } from "sonner";

const math = create(all);

const formSchema = z.object({
  expression: z.string().min(1, "Please enter a calculation or question."),
});

type FormValues = z.infer<typeof formSchema>;
type HistoryItem = {
  expression: string;
  result: string;
};
type Settings = {
  precision: number;
};

const easterEggs: { [key: string]: string } = {
  "what is the meaning of life": "42",
  "hello": "Hello there!",
  "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
  "magic": "✨ Abracadabra! ✨",
  "dyad": "You're chatting with me right now!",
};

const MagicCalculator = () => {
  const [result, setResult] = React.useState<string | null>(null);
  const [graphFunction, setGraphFunction] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [settings, setSettings] = React.useState<Settings>(() => {
    const savedSettings = localStorage.getItem("calcSettings");
    return savedSettings ? JSON.parse(savedSettings) : { precision: 14 };
  });
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { width, height } = useWindowSize();
  const isMobile = useIsMobile();
  const [showKeypad, setShowKeypad] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  React.useEffect(() => {
    localStorage.setItem("calcSettings", JSON.stringify(settings));
  }, [settings]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expression: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const originalExpression = values.expression.trim();
    const processedExpression = originalExpression.replace(/√/g, 'sqrt');
    const lowerCaseExpression = processedExpression.toLowerCase();

    setResult(null);
    setGraphFunction(null);

    if (easterEggs[lowerCaseExpression]) {
      const easterEggResult = easterEggs[lowerCaseExpression];
      setResult(easterEggResult);
      setHistory([{ expression: originalExpression, result: easterEggResult }, ...history].slice(0, 20));
      form.reset();
      return;
    }

    if (lowerCaseExpression.includes('x') && !lowerCaseExpression.includes('matrix')) {
       try {
        math.parse(processedExpression).compile().evaluate({ x: 1 });
        setGraphFunction(originalExpression);
        setHistory([{ expression: originalExpression, result: "[Graph]" }, ...history].slice(0, 20));
        form.reset();
        return;
      } catch (error) {
        // Fall through to normal evaluation to show error
      }
    }

    try {
      const calculatedResult = math.evaluate(processedExpression);
      if (typeof calculatedResult === 'function') {
        setResult("Please provide a full expression to calculate.");
        return;
      }
      const formattedResult = math.format(calculatedResult, { precision: settings.precision });
      setResult(formattedResult);
      setHistory([{ expression: originalExpression, result: formattedResult }, ...history].slice(0, 20));
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      form.reset();
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    form.setValue("expression", suggestion);
    form.handleSubmit(onSubmit)();
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("Calculation history has been cleared.");
  };

  const handleKeyPress = (key: string) => {
    const input = inputRef.current;
    if (!input) return;

    if (key === '=') {
      form.handleSubmit(onSubmit)();
      return;
    }

    if (key === 'C') {
      form.setValue("expression", "", { shouldValidate: true });
      setResult(null);
      setGraphFunction(null);
      return;
    }

    const currentExpression = form.getValues("expression") || "";
    const selectionStart = input.selectionStart ?? currentExpression.length;
    const selectionEnd = input.selectionEnd ?? currentExpression.length;

    let textToInsert = key;
    let cursorOffset = key.length;

    if (key.endsWith("()")) {
      cursorOffset = key.length - 1;
    }

    const newExpression = 
        currentExpression.substring(0, selectionStart) + 
        textToInsert + 
        currentExpression.substring(selectionEnd);

    form.setValue("expression", newExpression, { shouldValidate: true });

    setTimeout(() => {
      input.focus();
      const newCursorPos = selectionStart + cursorOffset;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card/80 backdrop-blur-sm border-border/50 animate-pop-in relative">
        <SettingsDialog settings={settings} onSettingsChange={setSettings} />
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6 text-blue-500 dark:text-blue-300" /> {/* Calculator icon with blue color */}
            <CardTitle>CountOn</CardTitle>
          </div>
          <CardDescription>Enter a calculation, a function to graph, or a question.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Main Calculator */}
            <div className="flex-grow md:w-1/2 flex flex-col">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="expression"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="e.g., 15% of 300 or sin(x)"
                            {...field}
                            ref={(e) => {
                              field.ref(e);
                              inputRef.current = e;
                            }}
                            className="text-lg h-12 text-center"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SuggestionChips onSelectSuggestion={handleSelectSuggestion} />
                  <Button type="submit" className="w-full">
                    Calculate
                  </Button>
                </form>
              </Form>

              {graphFunction && <GraphingView expression={graphFunction} />}

              {result && (
                <div 
                  key={history[0]?.expression + history[0]?.result}
                  className="mt-6 text-center animate-pop-in"
                >
                  <p className="text-muted-foreground">Result</p>
                  <p className="text-4xl font-bold break-all">{result}</p>
                </div>
              )}

              <div className="mt-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <History className="h-5 w-5" />
                    History
                  </h3>
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-40 w-full rounded-md border p-4">
                  {history.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your calculation history will appear here.</p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-muted-foreground truncate pr-4" title={item.expression}>{item.expression}</span>
                          <span className="font-semibold">{item.result}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>

            {/* Right Column: Keypads */}
            <div className="md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Keypad</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowKeypad(!showKeypad)} className="md:hidden">
                  <Calculator className="h-5 w-5" />
                </Button>
              </div>
              {(showKeypad || !isMobile) && (
                <div className="animate-accordion-down space-y-4">
                  <ScientificKeypad onKeyPress={handleKeyPress} />
                  <NumericKeypad onKeyPress={handleKeyPress} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MagicCalculator;