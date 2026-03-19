import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setLoading(true);

    const startTime = Date.now();

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const elapsed = Date.now() - startTime;

        // ✅ ensure loader is visible at least 300ms
        const minTime = 1500;

        if (elapsed < minTime) {
          setTimeout(() => setLoading(false), minTime - elapsed);
        } else {
          setLoading(false);
        }
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [location.pathname]);

  if (!loading) return null;

  return <Loader />;
};

export default RouteLoader;