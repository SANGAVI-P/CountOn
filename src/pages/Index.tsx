import Calculator from "@/components/Calculator";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="flex-grow flex items-center justify-center">
        <Calculator />
      </main>
      <footer className="w-full">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;