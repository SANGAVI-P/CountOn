import MagicCalculator from "@/components/MagicCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="flex-grow flex items-center justify-center w-full">
        <Tabs defaultValue="magic-calculator" className="w-full max-w-5xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="magic-calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Magic Calculator
            </TabsTrigger>
            <TabsTrigger value="internal-marks">
              <GraduationCap className="mr-2 h-4 w-4" />
              Internal Marks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="magic-calculator" className="mt-4">
            <MagicCalculator />
          </TabsContent>
          <TabsContent value="internal-marks" className="mt-4">
            <InternalMarkCalculator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;