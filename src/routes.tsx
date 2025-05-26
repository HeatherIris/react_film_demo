import { RouteObject } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
// import About from './pages/About';
import MovieSearch from './pages/MovieSearch';
import AuthLayout from "./pages/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'about', element: <About /> },
      { path: 'movies', element: <MovieSearch /> },
      {
        element: <AuthLayout />,              // 登陆/注册的嵌套路由
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
    ],
  },
];

export default routes;
