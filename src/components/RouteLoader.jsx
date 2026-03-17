import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fire loader on every route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(timer);
  }, [location.pathname]); // triggers on every path change

  if (!loading) return null;

  return <Loader onDone={() => setLoading(false)} />;
};

export default RouteLoader;