import { useSelector } from "react-redux";

import HeroSection from "../HeroSection";
import Navbar from "../shared/Navbar";
import Footer from "./Footer";
import LatestJobs from "./LatestJobs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
