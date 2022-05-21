import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";

import AOS from "aos";

import Mint from "./pages/Mint";

// import PageNotFound from "./pages/PageNotFound";
// import BlackMintPage from "./pages/BlackMintPage";
// import YellowGate from "./pages/YellowGate"
function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 500,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Mint />} />
        {/* <Route path="/0xBlackMint" element={<BlackMintPage />} />
        <Route path="/yellowgate" element={<YellowGate />} /> */}
      </Routes>
    </>
  );
}

export default App;
