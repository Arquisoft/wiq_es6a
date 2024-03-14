import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import GameView from "../components/GameView";
import {PrivateRoute} from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />
    },
    {
        path: "/home",
        element: <PrivateRoute>
            <Home />
        </PrivateRoute>
    },
    {
        path: "/game",
        element: <PrivateRoute>
            <GameView />
        </PrivateRoute>
    }
]);

export default router;