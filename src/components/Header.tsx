import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full max-w-5xl p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-xl font-bold">CountOn</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;