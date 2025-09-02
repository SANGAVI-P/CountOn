import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "@/components/Calculator";
import ScientificCalculator from "@/components/ScientificCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";
import FormulaLibrary from "@/components/FormulaLibrary";

const CalculatorContainer = () => {
  return (
    <Tabs defaultValue="normal" className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="normal">Normal</TabsTrigger>
        <TabsTrigger value="scientific">Scientific</TabsTrigger>
        <TabsTrigger value="marks">Internal Marks</TabsTrigger>
        <TabsTrigger value="formulas">Formulas</TabsTrigger>
      </TabsList>
      <TabsContent value="normal" className="mt-4 animate-pop-in">
        <Calculator />
      </TabsContent>
      <TabsContent value="scientific" className="mt-4 animate-pop-in">
        <ScientificCalculator />
      </TabsContent>
      <TabsContent value="marks" className="mt-4 animate-pop-in">
        <InternalMarkCalculator />
      </TabsContent>
      <TabsContent value="formulas" className="mt-4 animate-pop-in">
        <FormulaLibrary />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorContainer;