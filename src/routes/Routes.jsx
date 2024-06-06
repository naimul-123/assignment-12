import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import CommonLayout from "../layout/Layout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../dashboard/Dashboard";
import MyCart from "../dashboard/pages/MyCart";
import AdminHome from "../dashboard/admin/AdminHome";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";
import Apartments from "../pages/Apartments";
import Apartment from "../pages/Apartment";
import AdminRoute from "./AdminRoute";
import ManageAgreements from "../dashboard/admin/ManageAgreements";
import ManageCupon from "../dashboard/admin/ManageCupon";
import ManageMember from "../dashboard/admin/ManageMember";
import MemberRoute from "./MemberRoute";
import MakePayment from "../dashboard/member/MakePayment";
import MemberHome from "../dashboard/member/MemberHome";
import PaymentHistory from "../dashboard/member/PaymentHistory";
import UserHome from "../dashboard/user/UserHome";
import Announcements from "../dashboard/user/Announcements";
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
                path: '/apartments',
                element: <Apartments></Apartments>
            },
            {
                path: '/apartment/:id',
                element: <PrivateRoute><Apartment></Apartment></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/apartment/${params.id}`)
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
            // Admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageAgreement',
                element: <AdminRoute><ManageAgreements></ManageAgreements></AdminRoute>
            },
            {
                path: 'manageCupon',
                element: <AdminRoute><ManageCupon></ManageCupon></AdminRoute>
            },
            {
                path: 'manageMember',
                element: <AdminRoute><ManageMember></ManageMember></AdminRoute>
            },

            // member routes
            {
                path: 'memberHome',
                element: <MemberRoute><MemberHome></MemberHome></MemberRoute>
            },
            {
                path: 'makePayment',
                element: <MemberRoute><MakePayment></MakePayment></MemberRoute>
            },
            {
                path: 'paymentHistory',
                element: <MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>
            },
            // user routes
            {
                path: 'userHome',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: 'announcement',
                element: <PrivateRoute><Announcements></Announcements></PrivateRoute>
            },
        ]

    }
])

export default routes;