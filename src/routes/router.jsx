import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Products from "../pages/products/Products";
import DashboardLayout from './../layout/DashboardLayout';
import Dashboard from './../pages/Dashboard/Dashboard';
import ManageUsers from './../pages/Dashboard/Admin/users/ManageUsers';
import AdminHome from './../pages/Dashboard/Admin/AdminHome';
import ManageProducts from './../pages/Dashboard/Admin/ManageProducts';
import SellerHome from './../pages/Dashboard/Sellers/SellerHome';
import AddProduct from './../pages/Dashboard/Sellers/AddProduct';
import MyProducts from './../pages/Dashboard/Sellers/MyProducts';
import UpdateProduct from "../pages/Dashboard/Sellers/UpdateProduct";
import UserHome from "../pages/Dashboard/User/UserHome";
import UserRoute from './Private/UserRoute';
import SelectedProduct from './../pages/Dashboard/User/SelectedProduct';
import AsSeller from "../pages/Dashboard/User/Apply/AsSeller";
import OrderedProducts from "../pages/Dashboard/User/Order/OrderedProducts";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import MyPaymentHistory from "../pages/Dashboard/User/Payment/History.jsx/MyPaymentHistory";
import SellerRoute from "./Private/SellerRoute";
import AdminRoute from "./Private/AdminRoute";
import ShowSellers from './../pages/Sellers/ShowSellers';
import PrivateRoute from './PrivateRoute'
import UpdateUser from "../pages/Dashboard/Admin/users/UpdateUser";
// import MyCart from "../pages/Dashboard/User/MyCart/MyCart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "sellers",
                element: <ShowSellers />
            },
            {
                path: "products",
                element: <Products />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Dashboard />
                // element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            // * ADMIN ROUTES
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'update-user/:id',
                element: <UpdateUser />,
                loader: ({ params }) => fetch(`https://inventory-server-seven.vercel.app/users/${params.id}`),
            },
            {
                path: 'admin-home',
                element: <AdminHome />
            },
            {
                path: 'manage-product',
                element: <ManageProducts />
            },
            // * Seller ROUTES
            {
                path: 'seller-home',
                element: <SellerHome />
            },
            {
                path: 'add-product',
                element: <AddProduct />
            },
            {
                path: 'my-products',
                element: <MyProducts />
            },
            {
                path: 'update/:id',
                element: <UpdateProduct />,
                loader: ({ params }) => fetch(`https://inventory-server-seven.vercel.app/product/${params.id}`),
            },
            // * USER ROUTES
            {
                path: 'user-home',
                element: <UserHome />
            },
            {
                path: 'my-selected',
                // element:<MyCart />
                element: <SelectedProduct />
            },
            {
                path: 'user/payment',
                element: <Payment />
            },
            {
                path: 'my-payments',
                element: <MyPaymentHistory />
            },
            {
                path: 'apply-seller',
                element: <AsSeller />
            },
            {
                path: 'ordered-product',
                element: <OrderedProducts />
            }
        ]
    }
])