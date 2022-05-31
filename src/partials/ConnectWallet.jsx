// import { useContext } from "react";
import React, { useEffect, useState } from 'react'
// import { TransactionContext } from "../context/TransactionContext";
import { BiError } from 'react-icons/bi'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const ConnectWallet = (props) => {
  const [shortWallet, setShortWallet] = useState('')
  useEffect(() => {
    if (props.currentAccount) setShortWallet(props.currentAccount.slice(0, 5)+"..."+props.currentAccount.slice(-4))
    else setShortWallet("")
  }, [props.currentAccount])

  const connect = (e) => {
    props.connect()
  }
  const disconnect = (e) => {
    props.disconnect()
  }
  return (
    <div>
      <div className="flex justify-center mt-6">
        {/* {!account ? ( */}

        {!props.isConnected && (
          <button
            onClick={connect}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 w-80"
          >
            Connect Your Wallet To Mint
          </button>
        )}

        {props.isConnected && (
          <button
            onClick={disconnect}
            className="mb-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 w-80"
          >
            Disconnect Your Wallet
          </button>
        )}
      </div>
      {shortWallet && (
            <div className="text-center mb-4">
              <p className="text-gray-800"><b>Connected Wallet:</b> {shortWallet}</p>
            </div>
          )}
    </div>
  )
}

export default ConnectWallet
