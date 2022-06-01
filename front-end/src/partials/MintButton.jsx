import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ContractAbi from '../utils/abi.json'
import whiteListAddresses from '../utils/whitelist'
import contractAddress from '../utils/contractAddress.json'
import { ethers } from 'ethers'

const MintButton = (props) => {
  const { codeId } = useParams()
  const [mintError, setMintError] = useState('')
  const [proof, setProof] = useState({})
  const [currentAccount, setCurrentAccount] = useState('')
  const [band, setBand] = useState({})

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const contractABI = ContractAbi

  useEffect(() => {
    if (props.band) setBand(props.band)
  }, [props.band])

  useEffect(() => {
    if (codeId) setCode(codeId)
  }, [codeId])

  useEffect(() => {
    setMintError('')
    setProof(buildWhiteList(props.currentAccount))
  }, [])

  useEffect(() => {
    if (props.currentAccount) {
      setCurrentAccount(props.currentAccount)
    }
  }, [props.currentAccount])

  const onCodeChange = (e) => {
    setCode(e.target.value)
  }

  const buildWhiteList = () => {
    const leaves = whiteListAddresses.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const whiteListObj = {}
    for (var [i, value] in whiteListAddresses) {
      let hashAddressFor = keccak256(whiteListAddresses[i]);
      let forProof = tree.getHexProof(hashAddressFor);
      whiteListObj[whiteListAddresses[i]] = forProof;
    }
    console.log(whiteListObj)
    return whiteListObj
  }

  const doMint = async () => {
    try {
      setMintError('')
      setIsMinting(true)
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const posterContract = new ethers.Contract(
        contractAddress[0],
        contractABI,
        signer
      )
      const signerAddress = await signer.getAddress()
      console.log(proof)
      await posterContract.mint(1, proof[signerAddress])
      setIsMinting(false)
    } catch (e) {
      console.error(e)
      setMintError("Sorry! Couldn't mint the ConcertPoster")
      setIsMinting(false)
    }
  }

  return (
    <div className="flex justify-center px-12 pb-4">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="flex items-center justify-between">
            {!isMinting && (
              <button
                onClick={() => doMint()}
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                Mint ConcertPoster
              </button>
            )}
            {isMinting && (
              <button
                disabled
                className="bg-blue-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                Minting ConcertPoster..
              </button>
            )}
          </div>
          {mintError && (
            <div className="text-center">
              <p className="text-red-600 text-xs mt-2 font-bold">{mintError}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default MintButton
