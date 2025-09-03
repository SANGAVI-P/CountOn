import MagicCalculator from "@/components/MagicCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap } from "lucide-react";

const Index = () => {
  return (
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
  );
};

export default Index;