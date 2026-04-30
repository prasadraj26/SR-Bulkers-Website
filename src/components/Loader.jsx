import "./Loader.css";
import logo from "../assets/images/logos.webp";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">

        <div className="loader-logo-wrap">
          <img src={logo} alt="SR Bulkers" className="loader-logo" />
        </div>

        <span className="loader-name">SR BULKERS</span>

        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>

      </div>
    </div>
  );
};

export default Loader;
