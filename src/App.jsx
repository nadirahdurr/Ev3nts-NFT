import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";

import AOS from "aos";

import Landing from "./pages/Landing";
import Band from "./pages/Band";
import Artists from "./pages/Artists";
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
        <Route path={'/'} exact element={<Landing/>} />
        <Route path={'/artists'} exact element={<Artists/>} />
        <Route path="/m" forceRefresh={true} exact element={<Mint />} />
        <Route path="/m/:bandId" element={<Mint />} />
        <Route path="/m/:bandId/:concertId" element={<Mint />} />
        <Route path="/m/:bandId/:concertId/:codeId" element={<Mint />} />
        {/* <Route path="/0xBlackMint" element={<BlackMintPage />} />
        <Route path="/yellowgate" element={<YellowGate />} /> */}
        <Route element={Mint} />
      </Routes>
    </>
  );
}

export default App;
