import HeaderMint from "../partials/HeaderMint";
import HeroMint from "../partials/HeroMint";
import AboutMint from "../partials/AboutMint";
import ConnectWallet from "../partials/ConnectWallet";
import MintButton from "../partials/MintButton";
import MintCollectionSize from "../partials/MintCollectionSize";

function MintGreen() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-200">
      {/*  Site header */}
      <HeaderMint />
      {/* Main Content */}
      <HeroMint />
      <AboutMint />
      <ConnectWallet />
      <MintCollectionSize />
      <MintButton />
      {/* <Footer /> */}
    </div>
  );
}

export default MintGreen;
