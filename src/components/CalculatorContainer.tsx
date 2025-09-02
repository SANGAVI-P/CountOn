import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "@/components/Calculator";
import ScientificCalculator from "@/components/ScientificCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";
import FormulaLibrary from "@/components/FormulaLibrary";

const CalculatorContainer = () => {
  return (
    <Tabs defaultValue="normal" className="w-full max-w-md mx-auto animate-pop-in">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="normal">Normal</TabsTrigger>
        <TabsTrigger value="scientific">Scientific</TabsTrigger>
        <TabsTrigger value="marks">Internal Marks</TabsTrigger>
        <TabsTrigger value="formulas">Formulas</TabsTrigger>
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
      <TabsContent value="formulas" className="mt-4">
        <FormulaLibrary />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorContainer;