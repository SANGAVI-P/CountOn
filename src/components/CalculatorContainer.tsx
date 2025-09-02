import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "@/components/Calculator";
import ScientificCalculator from "@/components/ScientificCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";

const CalculatorContainer = () => {
  return (
    <Tabs defaultValue="normal" className="w-full max-w-md mx-auto animate-pop-in">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="normal">Normal</TabsTrigger>
        <TabsTrigger value="scientific">Scientific</TabsTrigger>
        <TabsTrigger value="marks">Internal Marks</TabsTrigger>
      </TabsList>
      <TabsContent value="normal" className="mt-4">
        <Calculator />
      </TabsContent>
      <TabsContent value="scientific" className="mt-4">
        <ScientificCalculator />
      </TabsContent>
      <TabsContent value="marks" className="mt-4">
        <InternalMarkCalculator />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorContainer;