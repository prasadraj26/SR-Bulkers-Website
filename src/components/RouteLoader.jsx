import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // ✅ start true for first load

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return <Loader />;
};

export default RouteLoader;