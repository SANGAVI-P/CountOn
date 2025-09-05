"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Bot, Send } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  question: z.string().min(1, "Please enter a question."),
});

type FormValues = z.infer<typeof formSchema>;

const AIQnAModel = () => {
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setAnswer(null);
    toast.info("Thinking...", { id: "ai-thinking", duration: 5000 });

    // Simulate an API call to an AI model
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    const userQuestion = values.question.toLowerCase();
    let simulatedAnswer = "I'm sorry, I can only provide general information at the moment. For complex queries, please connect me to a real AI service!";

    if (userQuestion.includes("hello") || userQuestion.includes("hi")) {
      simulatedAnswer = "Hello there! How can I assist you today?";
    } else if (userQuestion.includes("weather")) {
      simulatedAnswer = "I cannot access real-time weather data. Please check a weather app!";
    } else if (userQuestion.includes("time")) {
      simulatedAnswer = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (userQuestion.includes("name")) {
      simulatedAnswer = "I am CountOn's AI assistant, designed to help you with various queries!";
    } else if (userQuestion.includes("dyad")) {
      simulatedAnswer = "Dyad is the platform that helped create me! It's a powerful AI editor for web applications.";
    }

    setAnswer(simulatedAnswer);
    setIsLoading(false);
    toast.dismiss("ai-thinking");
    toast.success("Answer generated!");
    form.reset();
  };

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm border-border/50 animate-pop-in">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Bot className="h-6 w-6 text-green-500 dark:text-green-300" />
          <CardTitle>AI Q&A Model</CardTitle>
        </div>
        <CardDescription>Ask me anything! (Currently a placeholder AI)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g., What is the capital of France?"
                      {...field}
                      className="text-lg h-12"
                      autoComplete="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Thinking..." : "Ask Question"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>

        {answer && (
          <div className="mt-6 animate-pop-in">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-500 dark:text-green-300" />
              AI's Answer:
            </h3>
            <Textarea
              readOnly
              value={answer}
              className="min-h-[100px] bg-muted/50 border-muted-foreground/20"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIQnAModel;