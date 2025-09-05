import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react"; // Import Calculator icon

const Header = () => {
  return (
    <header className="w-full max-w-5xl p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-blue-500 dark:text-blue-300" /> {/* Calculator icon with blue color */}
        <h1 className="text-xl font-bold">CountOn</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;