import CalculatorContainer from "@/components/CalculatorContainer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="flex-grow flex items-center justify-center w-full">
        <CalculatorContainer />
      </main>
    </div>
  );
};

export default Index;