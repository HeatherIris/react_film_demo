import { NavLink } from "react-router-dom";
import "./NavBar.css";          // 可选：放一些简单样式

export default function NavBar() {
  /** 给 NavLink 写一个“高亮” class */
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="nav">
      <NavLink to="/"          end   className={linkCls}>Home</NavLink>
      <NavLink to="/about"           className={linkCls}>About</NavLink>
      {/* <NavLink to="/login"           className={linkCls}>Login</NavLink>
      <NavLink to="/register"        className={linkCls}>Register</NavLink>
      <NavLink to="/concerts"        className={linkCls}>Concerts</NavLink>
      <NavLink to="/concerts/trending" className={linkCls}>Trending</NavLink>
      <NavLink to="/concerts/london" className={linkCls}>London</NavLink> */}
    </nav>
  );
}
