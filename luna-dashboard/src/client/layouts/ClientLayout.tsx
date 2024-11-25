import { Nav } from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export function ClientLayout() {
  return (
    <div className="relative">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
