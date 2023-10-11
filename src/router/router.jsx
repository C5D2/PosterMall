import MainLayout from "../component/mainLayout/MainLayout";

import { createBrowserRouter } from "react-router-dom";

import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Register from "../page/register/Register";
import User from "../page/userPage/User";
import BestItem from "../page/BestItem";
import IllustratorItem from "../page/IllustratorItem";
import AllItem from "../page/AllItem";
import PhotoItem from "../page/PhotographyItem";
import TypographyItem from "../page/TypographyItem";
import FamousPainting from "../page/FamousPainting";
import Cart from "../page/cart/Cart";
import ListDeatilPage from "../page/detail/ListDeatilPage";
import ProductForm from "../page/admin/ProductForm";
import ProductManagement from "../page/admin/ProductManagement";
import ProductModification from "../page/admin/ProductModification";
import ProductRegistration from "../page/admin/ProductRegistration";
import Order from "../page/order/Order";
import OrderHistory from "../page/OrderHistory/OrderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        // home
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/best",
        element: <BestItem />,
      },
      {
        path: "/all",
        element: <AllItem />,
      },
      {
        path: "/illustrator",
        element: <IllustratorItem />,
      },
      {
        path: "/famous-painting",
        element: <FamousPainting />,
      },
      {
        path: "/photography",
        element: <PhotoItem />,
      },
      {
        path: "/typography",
        element: <TypographyItem />,
      },
      {
        path: "/product/:product_id",
        element: <ListDeatilPage />,
      },
      // 추후 Protect Route 기능 추가 예정
      {
        path: "/product-management",
        element: <ProductManagement />,
      },
      {
        path: "/product-form",
        element: <ProductRegistration />,
      },
      {
        path: "/product-modification/:id",
        element: <ProductModification />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order-history",
        element: <OrderHistory />,
      },
    ],
  },
]);

export default router;
