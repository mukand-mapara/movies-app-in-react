import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPgae";
import SearchPage from "../pages/SearchPage";
import AuthPage from "../pages/AuthPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: ":explore", element: <ExplorePage /> },
      { path: ":explore/:id", element: <DetailPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
  { path: "/login", element: <AuthPage isSignup={false} /> },
  { path: "/signup", element: <AuthPage isSignup={true} /> },
]);

export default router;
