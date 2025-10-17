import "./Preloader.css";

function Preloader() {
  return (
    <div className="loader-overlay " id="loader">
      <div className="loader-wrapper">
        <div className="loader-inner one"></div>
        <div className="loader-inner two"></div>
        <div className="loader-inner three"></div>
      </div>
    </div>
  );
}

export default Preloader;
