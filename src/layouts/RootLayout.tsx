import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function RootLayout() {
  return (
    <div className="app-wrapper">
      <NavBar />
      {/* 所有子路由都会渲染到这里 */}
      <Outlet />
    </div>
  );
}
