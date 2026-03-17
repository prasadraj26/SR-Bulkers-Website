import { useEffect } from "react";
import "./Loader.css";
import logo from "../assets/images/logos.png";

const Loader = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2100);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-logo-wrap">
          <img src={logo} alt="SR Bulkers" className="loader-logo" />
        </div>
        <span className="loader-name">SR Bulkers</span>
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loader;