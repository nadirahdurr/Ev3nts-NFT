import React, { useEffect, useState } from 'react'
import HeaderMint from "../partials/HeaderMint";
import HeroMint from "../partials/HeroMint";
import AboutMint from "../partials/AboutMint";
import BandDescription from "../partials/BandDescription";
import ConnectWallet from "../partials/ConnectWallet";
import MintButton from "../partials/MintButton";
import MintCollectionSize from "../partials/MintCollectionSize";
import BandsList from '../utils/bands.json'
import { useParams, useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

const MintGreen = (props) => {
  const { bandId } = useParams()
  const [band, setBand] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  useEffect(() => {
    if (bandId != '') {
      const found = BandsList.filter((e) => e.disabled !== true).find(
        (band) => band.id == bandId
      )
      if (found) setBand(found)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-200">
      {/*  Site header */}
      <HeaderMint />
      {/* Main Content */}
      <HeroMint />
      <BandDescription band={band} />
      <ConnectWallet band={band} isConnected={isConnected} connect={()=>setIsConnected(true)} disconnect={()=>setIsConnected(false)}/>
      {isConnected && (<MintButton band={band} />)}
      <AboutMint />
      {/* <MintCollectionSize /> */}
      {/* <Footer /> */}
      <p className="text-center text-gray-500 text-xs">
          &copy;2022 Ev3nts NFT. All rights reserved.
        </p>
    </div>
  );
}

export default MintGreen;
