// import { useContext } from "react";
// import { TransactionContext } from "../context/TransactionContext";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ContractAbi from '../utils/abi.json'
import whiteListAddresses from '../utils/whitelist.json'
import contractAddress from '../utils/contractAddress.json'
import { ethers } from 'ethers'

const MintButton = (props) => {
  const { codeId } = useParams()
  const [mintError, setMintError] = useState('')
  const [band, setBand] = useState({})
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const contractABI = ContractAbi.abi

  useEffect(() => {
    if (props.band) setBand(props.band)
  }, [props.band])

  useEffect(() => {
    if (codeId) setCode(codeId)
  }, [codeId])

  useEffect(() => {
    setMintError('')
  }, [])

  const onCodeChange = (e) => {
    setCode(e.target.value)
  }

  const merkleProof = (address) => {
    const whitekObj = {}
    if (whiteListAddresses.length > 0 && address) {
      const leaves = whiteListAddresses.map((address) => keccak256(address))
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
      for (let i = 0; i < whiteListAddresses.length; i++) {
        let hashAddressFor = keccak256(whiteListAddresses[i])
        let forProof = tree.getHexProof(hashAddressFor)
        whitekObj[whiteListAddresses[i]] = forProof
      }
    }
    return whitekObj
  }

  const doMint = async () => {
    try {
      setMintError('')
      setIsMinting(true)
      const { ethereum } = window
      const currentAccount = props.currentAccount
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const posterContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )
      await posterContract.mint(1, merkleProof[currentAccount])
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
          {/* <div className="max-w-3xl mx-auto text-center mb-3">
            <span className="text-lg">Enter your info</span>
          </div> */}
          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Code"
              value={code}
              onChange={onCodeChange}
            />
          </div> */}
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
