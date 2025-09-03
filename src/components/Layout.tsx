import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <main className="flex-grow w-full flex items-center justify-center p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;