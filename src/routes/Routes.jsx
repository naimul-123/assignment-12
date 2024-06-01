import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import CommonLayout from "../layout/CommonLayout";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <CommonLayout></CommonLayout>,
        children: [
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default routes;