// import { useContext } from "react";
// import { TransactionContext } from "../context/TransactionContext";
import { BiError } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

function ConnectWallet() {
  // const { connect, disconnect, account } = useContext(TransactionContext);
  return (
    <div>
      <div className="flex justify-center">
        {/* {!account ? ( */}
          <button
            // onClick={connect}
            className="btn font-kalam uppercase rounded-lg border-black border-2 bg-[#02a346] hover:bg-[#7abfa0] shadow-lg shadow-black h-12 w-80"
          >
            Connect Your Wallet To Mint
          </button>
        {/* ) : ( */}
          {/* <button
            // onClick={disconnect}
            className="btn font-kalam uppercase rounded-lg border-black border-2 bg-[#02a346] hover:bg-[#7abfa0] shadow-lg shadow-black"
          >
            Disconnect Your Wallet
          </button> */}
        {/* )} */}
      </div>
      <div className="flex justify-center pt-6 font-josefin items-center">
        Connection Status:
        {/* {!account ? ( */}
          <BiError className="text-red-600 text-2xl" />
        {/* ) : ( */}
          {/* <AiOutlineCheckCircle className="text-green-700 text-2xl" /> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default ConnectWallet;
