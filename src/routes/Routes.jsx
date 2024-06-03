import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import CommonLayout from "../layout/Layout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../dashboard/Dashboard";
import MyCart from "../dashboard/pages/MyCart";
import AdminHome from "../dashboard/pages/AdminHome";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'admin',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            }
        ]

    }
])

export default routes;