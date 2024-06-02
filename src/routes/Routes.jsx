import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import CommonLayout from "../layout/CommonLayout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../dashboard/Dashboard";
import MyCart from "../dashboard/pages/MyCart";
import AdminHome from "../dashboard/pages/AdminHome";
import Home from "../pages/Home";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <CommonLayout></CommonLayout>,
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
        element: <Dashboard></Dashboard>,
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