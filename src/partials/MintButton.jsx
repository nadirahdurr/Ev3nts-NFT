// import { useContext } from "react";
// import { TransactionContext } from "../context/TransactionContext";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const MintButton = (props) => {
  const { codeId } = useParams()
  const [band, setBand] = useState({})
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isMinting, setIsMinting] = useState(false)

  useEffect(() => {
    if (props.band) setBand(props.band)
  }, [props.band])

  useEffect(() => {
    if (codeId) setCode(codeId)
  }, [codeId])

  const onInputChange = (e) => {
    //const value = e.target.value
    //props.response(value)
  }
  const delay = ms => new Promise(res => setTimeout(res, ms))
  const doMint = async (e) => {
    setIsMinting(true)
    await delay(3000)
    setIsMinting(false)
  }
  // const {
  //   freeMintAmount,
  //   publicMintAmount,
  //   ogMintActive,
  //   publicMintActive,
  //   handleIncrementClick,
  //   handleDecrementClick,
  //   freeMintTransaction,
  //   publicMintTransaction,
  //   loadingPublicMint,
  //   loadingOgMint,
  //   balanceOf,
  //   list,
  //   account,
  // } = useContext(TransactionContext);

  return (
    <div className="flex justify-center px-12 pb-4">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="max-w-3xl mx-auto text-center mb-3">
            <span className="text-lg">Enter your info</span>
          </div>
          <div className="mb-4">
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
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            {!isMinting && (<button
              onClick={()=>doMint()}
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Mint NFT
            </button>)}
            {isMinting && (<button
              disabled
              className="bg-blue-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Minting NFT..
            </button>)}
          </div>
        </form>

      </div>
    </div>
  )
}

export default MintButton
