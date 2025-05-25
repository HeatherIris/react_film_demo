import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Area</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Outlet />
    </div>
  );
}
