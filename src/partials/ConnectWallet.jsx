// import { useContext } from "react";
import React, { useEffect, useState } from 'react'
// import { TransactionContext } from "../context/TransactionContext";
import { BiError } from 'react-icons/bi'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const ConnectWallet = (props) => {
  // const { connect, disconnect, account } = useContext(TransactionContext);
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
      {/* <div className="flex justify-center pt-6 pb-6 font-josefin items-center">
        Connection Status:
        {!props.currentAccount && <BiError className="text-red-600 text-2xl" />}
        {props.currentAccount && (
          <AiOutlineCheckCircle className="text-green-700 text-2xl" />
        )}
      </div> */}
    </div>
  )
}

export default ConnectWallet
