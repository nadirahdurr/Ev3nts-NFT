import React, { useEffect, useState } from 'react'
import HeaderMint from '../partials/HeaderMint'
import AboutMint from '../partials/AboutMint'
import BandsList from '../utils/bands.json'
import { useParams, useNavigate } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import BandSelection from '../partials/BandSelection'

const Landing = (props) => {
  const { bandId } = useParams()
  const [band, setBand] = useState({})

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
      {/* <BandDescription band={band} /> */}
      <div className="pt-8 pb-8 md:pt-12 md:pb-12" />
      <BandSelection bands={BandsList} />
      <AboutMint />
      {/* <MintCollectionSize /> */}
      {/* <Footer /> */}
      <p className="text-center text-gray-500 text-xs mt-6">
        &copy;2022 Ev3nts NFT. All rights reserved.
      </p>
    </div>
  )
}

export default Landing
