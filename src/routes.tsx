import RootLayout      from "./layouts/RootLayout";
import Home            from "./pages/Home";
import About           from "./pages/About";
// import AuthLayout      from "./pages/auth/Layout";
// import Login           from "./pages/auth/Login";
// import Register        from "./pages/auth/Register";
// import ConcertHome     from "./pages/concerts/Home";
// import ConcertCity     from "./pages/concerts/City";
// import ConcertTrending from "./pages/concerts/Trending";

/**
 * 把所有页面放进 RootLayout.children 里，
 * 这样导航始终位于页面顶端
 */
export default [
  {
    element: <RootLayout />,      // ★ 顶层布局 + Nav
    children: [
      { index: true,  element: <Home /> },   // 等价于 path: ""
      { path: "about", element: <About /> },

      // {
      //   element: <AuthLayout />,              // 登陆/注册的嵌套路由
      //   children: [
      //     { path: "login",    element: <Login /> },
      //     { path: "register", element: <Register /> },
      //   ],
      // },

      // {
      //   path: "concerts",
      //   children: [
      //     { index: true,      element: <ConcertHome /> },
      //     { path: "trending", element: <ConcertTrending /> },
      //     { path: ":city",    element: <ConcertCity /> },
      //   ],
      // },
    ],
  },
];
