import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const assessmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  obtained: z.coerce.number({ invalid_type_error: "Must be a number" }).min(0, "Cannot be negative"),
  total: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Must be at least 1"),
  weightage: z.coerce.number({ invalid_type_error: "Must be a number" }).min(0, "Cannot be negative").max(100, "Cannot exceed 100"),
}).refine(data => data.obtained <= data.total, {
  message: "Obtained marks cannot exceed total marks",
  path: ["obtained"],
});

const formSchema = z.object({
  assessments: z.array(assessmentSchema),
});

type FormValues = z.infer<typeof formSchema>;

const InternalMarkCalculator = () => {
  const [finalMark, setFinalMark] = React.useState<number | null>(null);
  const [totalWeightage, setTotalWeightage] = React.useState<number>(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assessments: [
        { name: "Assignment 1", obtained: 85, total: 100, weightage: 20 },
        { name: "Mid-Term Exam", obtained: 75, total: 100, weightage: 50 },
        { name: "Project", obtained: 90, total: 100, weightage: 30 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "assessments",
  });

  const onSubmit = (values: FormValues) => {
    const currentTotalWeightage = values.assessments.reduce((acc, a) => acc + a.weightage, 0);
    if (currentTotalWeightage > 100) {
      toast.error("Total weightage cannot exceed 100%");
      setFinalMark(null);
      return;
    }
    
    const calculatedMark = values.assessments.reduce((acc, assessment) => {
      const { obtained, total, weightage } = assessment;
      if (total === 0) return acc;
      return acc + (obtained / total) * weightage;
    }, 0);

    setFinalMark(calculatedMark);
    setTotalWeightage(currentTotalWeightage);
    toast.success("Calculation successful!");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-center">Internal Mark Calculator</CardTitle>
        <CardDescription className="text-center">Add assessments and their weightage to calculate the final mark.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <FormField control={form.control} name={`assessments.${index}.name`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Assignment 1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name={`assessments.${index}.obtained`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Obtained</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`assessments.${index}.total`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`assessments.${index}.weightage`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weightage (%)</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => append({ name: "", obtained: 0, total: 100, weightage: 0 })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Assessment
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-4">
            <Button type="submit" className="w-full">Calculate Final Mark</Button>
            {finalMark !== null && (
              <div className="text-center text-xl font-bold p-4 bg-muted rounded-lg w-full">
                <p>Final Internal Mark:</p>
                <p className="text-3xl text-primary">{finalMark.toFixed(2)} / {totalWeightage}</p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default InternalMarkCalculator;