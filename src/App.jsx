import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/movieoSlice";

const App = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      console.log("Trending Response:", response.data);
      dispatch(setBannerData(response.data.results)); // will fix if needed
    } catch (error) {
      console.error(
        "Error in fetchTrendingData:",
        error.response?.data || error.message
      );
    }
  };

  const fetchConfigration = async () => {
    try {
      const response = await axios.get("/configuration");
      console.log(response, "ConfigRes");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfigration();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default App;
