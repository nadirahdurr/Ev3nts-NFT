import React, { useEffect, useState } from 'react'
import HeaderMint from '../partials/HeaderMint'
import BandLanding from '../partials/BandLanding'
import AboutMint from '../partials/AboutMint'
import BandDescription from '../partials/BandDescription'
import ConcertDescription from '../partials/ConcertDescription'
import ConnectWallet from '../partials/ConnectWallet'
import MintButton from '../partials/MintButton'
import MintCollectionSize from '../partials/MintCollectionSize'
import BandsList from '../utils/bands.json'
import { useParams, useNavigate } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import StepsMint from '../partials/StepsMint'
import phishLogo from '../phish.png'

const Band = (props) => {
  const { bandId, concertId } = useParams()
  const [band, setBand] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [concert, setConcert] = useState({})
  const navigate = useNavigate()
  // const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const connectWallet = async () => {
    await connectMetamask()
  }

  const connectMetamask = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('You need Metamask to mint!')
        return
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
      setIsConnected(true)
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectMetamask = () => {
    setCurrentAccount('')
    setIsConnected(false)
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Make sure you have Metamask!')
      } else {
        console.log('We have the ethereum object', ethereum)
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account', account)
        setCurrentAccount(account)
        setIsConnected(true)
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    checkIfWalletIsConnected()
    console.log(bandId)
    if (!bandId) setBand({})
  }, [])

  useEffect(() => {
    if (!bandId) setBand({})
  }, [bandId])

  useEffect(() => {
    if (bandId != '') {
      const found = BandsList.filter((e) => e.disabled !== true).find(
        (band) => band.id == bandId
      )
      if (found) {
        setBand(found)
        // if (concertId != '') {
        //   const concert = found.concerts
        //     .filter((e) => e.disabled !== true)
        //     .find((concert) => concert.concertCode == concertId)
        //   if (concert) setConcert(concert)
        //   else {
        //     // navigate('../m/' + bandId)
        //   }
        // }
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-200">
      {/*  Site header */}
      <HeaderMint />
      {band.logo == true && (<div className="mx-auto text-center pt-20">
        <img
          src={phishLogo}
          width="600"
        />
      </div>)}
      {band.logo != true && (<div className="mx-auto text-center pt-24"/>)}
      {/* Main Content */}
      {/* <BandLanding /> */}
      <BandDescription band={band} />
      {/* <ConcertDescription concert={concert} /> */}
      <ConnectWallet
        band={band}
        isConnected={isConnected}
        connect={() => connectWallet()}
        disconnect={() => disconnectMetamask()}
        currentAccount={currentAccount}
      />
      {isConnected && <MintButton band={band} />}
      <StepsMint />
      {/* <MintCollectionSize /> */}
      {/* <Footer /> */}
      <p className="text-center text-gray-500 text-xs mt-6">
        &copy;2022 Ev3nts NFT. All rights reserved.
      </p>
    </div>
  )
}

export default Band
