import CalculatorContainer from "@/components/CalculatorContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="flex-grow flex items-center justify-center w-full">
        <CalculatorContainer />
      </main>
    </div>
  );
};

export default Index;