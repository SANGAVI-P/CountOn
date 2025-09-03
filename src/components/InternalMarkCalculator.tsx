import * as React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";

const assessmentSchema = z.object({
  name: z.string().min(1, "Name is required."),
  obtained: z.coerce.number({ invalid_type_error: "Must be a number" }).min(0, "Cannot be negative."),
  max: z.coerce.number({ invalid_type_error: "Must be a number" }).positive("Max marks must be positive."),
  weightage: z.coerce.number({ invalid_type_error: "Must be a number" }).min(0, "Cannot be negative.").max(100, "Cannot exceed 100."),
}).refine(data => data.obtained <= data.max, {
  message: "Obtained marks cannot exceed max marks.",
  path: ["obtained"],
});

const formSchema = z.object({
  assessments: z.array(assessmentSchema),
});

type FormValues = z.infer<typeof formSchema>;

const InternalMarkCalculator = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assessments: [
        { name: "Assignment 1", obtained: 0, max: 10, weightage: 20 },
        { name: "Quiz 1", obtained: 0, max: 15, weightage: 30 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "assessments",
  });

  const watchedAssessments = useWatch({
    control: form.control,
    name: "assessments",
  });

  const { totalMarks, totalWeightage } = React.useMemo(() => {
    let totalMarks = 0;
    let totalWeightage = 0;
    
    if (watchedAssessments) {
      for (const assessment of watchedAssessments) {
        const { obtained, max, weightage } = assessment;
        if (!isNaN(obtained) && !isNaN(max) && max > 0 && !isNaN(weightage)) {
          totalMarks += (obtained / max) * weightage;
        }
        if (!isNaN(weightage)) {
          totalWeightage += weightage;
        }
      }
    }

    return {
      totalMarks: parseFloat(totalMarks.toFixed(2)),
      totalWeightage: parseFloat(totalWeightage.toFixed(2)),
    };
  }, [watchedAssessments]);

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm border-border/50 animate-pop-in">
      <CardHeader className="text-center">
        <CardTitle>Internal Mark Calculator</CardTitle>
        <CardDescription>Calculate your final internal score based on various assessments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-start p-3 border rounded-lg relative">
                  <FormField
                    control={form.control}
                    name={`assessments.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Assignment 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`assessments.${index}.obtained`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Marks Obtained</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="18" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`assessments.${index}.max`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Max Marks</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`assessments.${index}.weightage`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Weightage (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="40" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-1 flex items-end h-full">
                    <Button variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => append({ name: "", obtained: 0, max: 10, weightage: 0 })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Assessment
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Your Results</h3>
            <div className="flex justify-around items-center p-4 bg-muted rounded-lg">
                <div>
                    <p className="text-sm text-muted-foreground">Total Weightage</p>
                    <p className={`text-2xl font-bold ${totalWeightage > 100 ? 'text-destructive' : ''}`}>{totalWeightage}%</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Final Internal Mark</p>
                    <p className="text-2xl font-bold text-primary">{totalMarks} / {totalWeightage}</p>
                </div>
            </div>
            {totalWeightage > 100 && <p className="text-sm text-destructive">Total weightage cannot exceed 100%.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalMarkCalculator;