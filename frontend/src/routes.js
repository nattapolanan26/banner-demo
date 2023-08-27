import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
// Pages
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import BannerPage from "./pages/BannerPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserProvider from "./hooks/user";
import BannerProvider from "./hooks/banner";
// ----------------------------------------------------------------------

export default function Router(isLoggedIn) {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" exact />
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "/user",
      element: isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" exact />
      ),
      children: [
        {
          element: (
            <UserProvider>
              <UserPage />
            </UserProvider>
          ),
          index: true,
        },
      ],
    },
    {
      path: "/banner",
      element: isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" exact />
      ),
      children: [
        {
          element: (
            <BannerProvider>
              <BannerPage />
            </BannerProvider>
          ),
          index: true,
        },
      ],
    },
    {
      path: "/shop",
      element: isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" exact />
      ),
      children: [
        {
          element: (
            <>
              <ShopPage />
            </>
          ),
          index: true,
        },
      ],
    },
    {
      path: "login",
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard/app" />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
