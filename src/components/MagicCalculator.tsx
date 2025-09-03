import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Wand2 } from "lucide-react";
import { create, all } from 'mathjs';

const math = create(all);

const formSchema = z.object({
  expression: z.string().min(1, "Please enter a calculation or question."),
});

type FormValues = z.infer<typeof formSchema>;
type HistoryItem = {
  expression: string;
  result: string;
};

const MagicCalculator = () => {
  const [result, setResult] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expression: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    try {
      const calculatedResult = math.evaluate(values.expression);
      if (typeof calculatedResult === 'function') {
        setResult("Please provide a full expression to calculate.");
        return;
      }
      const formattedResult = math.format(calculatedResult, { precision: 14 });
      setResult(formattedResult);
      setHistory([{ expression: values.expression, result: formattedResult }, ...history].slice(0, 20));
      form.reset();
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg bg-card/80 backdrop-blur-sm border-border/50 animate-pop-in">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Wand2 className="h-6 w-6" />
          <CardTitle>Magic Calculator</CardTitle>
        </div>
        <CardDescription>Use natural language for calculations, conversions, and more.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="expression"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g., (5 + 3) * 2, 10cm in inch, sin(45 deg)"
                      {...field}
                      className="text-lg h-12 text-center"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">Result</p>
            <p className="text-4xl font-bold break-all">{result}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <History className="h-5 w-5" />
            History
          </h3>
          <ScrollArea className="h-40 w-full rounded-md border p-4">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground">Your calculation history will appear here.</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.expression}</span>
                    <span className="font-semibold">{item.result}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default MagicCalculator;