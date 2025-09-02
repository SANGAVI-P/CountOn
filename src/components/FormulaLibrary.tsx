import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { create, all } from 'mathjs';

const math = create(all);

const formulaSchema = z.object({
  name: z.string().min(1, "Formula name is required"),
  expression: z.string().min(1, "Expression is required"),
  variables: z.string().min(1, "Define at least one variable (comma-separated, e.g., x,y,z)"),
});

type Formula = z.infer<typeof formulaSchema>;

const useFormulas = () => {
  const [formulas, setFormulas] = React.useState<Formula[]>(() => {
    const saved = localStorage.getItem("custom-formulas");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("custom-formulas", JSON.stringify(formulas));
  }, [formulas]);

  const addFormula = (formula: Formula) => {
    setFormulas([...formulas, formula]);
  };

  const removeFormula = (index: number) => {
    setFormulas(formulas.filter((_, i) => i !== index));
  };

  return { formulas, addFormula, removeFormula };
};

const FormulaCalculator: React.FC<{ formula: Formula }> = ({ formula }) => {
  const [result, setResult] = React.useState<string | null>(null);
  const variables = formula.variables.split(',').map(v => v.trim()).filter(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const scope: { [key: string]: number } = {};
    
    try {
      variables.forEach(v => {
        const value = formData.get(v) as string;
        if (value === null || value.trim() === '') {
          throw new Error(`Variable '${v}' cannot be empty.`);
        }
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          throw new Error(`Invalid number for variable '${v}'.`);
        }
        scope[v] = parsedValue;
      });
      
      const calculatedResult = math.evaluate(formula.expression, scope);
      const formattedResult = math.format(calculatedResult, { precision: 14 });
      setResult(formattedResult);
      toast.success("Calculation successful!");
    } catch (error: any) {
      toast.error(error.message || "Calculation failed.");
      setResult(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {variables.map(variable => (
          <div key={variable}>
            <label htmlFor={variable} className="block text-sm font-medium mb-1">{variable}</label>
            <Input id={variable} name={variable} type="number" step="any" required placeholder={`Value for ${variable}`} />
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full">Calculate</Button>
      {result !== null && (
        <div className="text-center text-xl font-bold p-4 bg-muted rounded-lg w-full">
          <p>Result:</p>
          <p className="text-3xl text-primary break-all">{result}</p>
        </div>
      )}
    </form>
  );
};


const FormulaLibrary = () => {
  const { formulas, addFormula, removeFormula } = useFormulas();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const form = useForm<Formula>({
    resolver: zodResolver(formulaSchema),
    defaultValues: { name: "", expression: "", variables: "" },
  });

  const onSubmit = (values: Formula) => {
    addFormula(values);
    form.reset();
    setIsDialogOpen(false);
    toast.success("Formula saved successfully!");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-center">Custom Formula Library</CardTitle>
        <CardDescription className="text-center">Save and calculate your own formulas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {formulas.length === 0 ? (
          <p className="text-center text-muted-foreground">No formulas saved yet.</p>
        ) : (
          formulas.map((formula, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{formula.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFormula(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Expression: <code>{formula.expression}</code></p>
                <FormulaCalculator formula={formula} />
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Formula
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Formula</DialogTitle>
            </Header>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formula Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Area of a Circle" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="expression" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expression</FormLabel>
                    <FormControl><Input placeholder="e.g., pi * r^2" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="variables" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variables (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="e.g., r" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit">Save Formula</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default FormulaLibrary;