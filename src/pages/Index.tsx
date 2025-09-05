import MagicCalculator from "@/components/MagicCalculator";
import InternalMarkCalculator from "@/components/InternalMarkCalculator";
import AIQnAModel from "@/components/AIQnAModel"; // Import the new component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap, Bot } from "lucide-react"; // Import Bot icon

const Index = () => {
  return (
    <Tabs defaultValue="magic-calculator" className="w-full max-w-5xl">
      <TabsList className="grid w-full grid-cols-3"> {/* Updated grid-cols to 3 */}
        <TabsTrigger value="magic-calculator">
          <Calculator className="mr-2 h-4 w-4" />
          Magic Calculator
        </TabsTrigger>
        <TabsTrigger value="internal-marks">
          <GraduationCap className="mr-2 h-4 w-4" />
          Internal Marks
        </TabsTrigger>
        <TabsTrigger value="ai-qna"> {/* New tab trigger */}
          <Bot className="mr-2 h-4 w-4" />
          AI Q&A
        </TabsTrigger>
      </TabsList>
      <TabsContent value="magic-calculator" className="mt-4 animate-pop-in">
        <MagicCalculator />
      </TabsContent>
      <TabsContent value="internal-marks" className="mt-4 animate-pop-in">
        <InternalMarkCalculator />
      </TabsContent>
      <TabsContent value="ai-qna" className="mt-4 animate-pop-in"> {/* New tab content */}
        <AIQnAModel />
      </TabsContent>
    </Tabs>
  );
};

export default Index;