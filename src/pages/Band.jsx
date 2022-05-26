import React, { useEffect, useState } from 'react'
import HeaderMint from '../partials/HeaderMint'
import BandLanding from '../partials/BandLanding'
import AboutMint from '../partials/AboutMint'
import StepsMint from '../partials/StepsMint'
import BandDescription from '../partials/BandDescription'
import ConnectWallet from '../partials/ConnectWallet'
import MintButton from '../partials/MintButton'
import ConcertSelection from '../partials/ConcertSelection'
import BandsList from '../utils/bands.json'
import { useParams, useNavigate } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

const Band = (props) => {
  const { bandId } = useParams()
  const [band, setBand] = useState({})

  useEffect(() => {
    //checkIfWalletIsConnected()
  }, [])

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
      <BandLanding band={band}/>
      <BandDescription band={band} />
      <ConcertSelection band={band} />
      {/* <AboutMint /> */}
      {/* <StepsMint /> */}
      {/* <Footer /> */}
      <p className="text-center text-gray-500 text-xs  mt-6">
        &copy;2022 Ev3nts NFT. All rights reserved.
      </p>
    </div>
  )
}

export default Band
