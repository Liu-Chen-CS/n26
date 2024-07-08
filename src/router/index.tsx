import {createBrowserRouter} from "react-router-dom";
import Month from "../pages/Month/Month";
import Layout from "../pages/Layout/Layout";
import Year from "../pages/Year/Year";
import New from "../pages/New/New";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <Month/>
            },
            {
              path: "year",
              element: <Year/>
            },
        ],
    },
    {
        path: "/new",
        element: <New/>
    }
]);
export default router;
