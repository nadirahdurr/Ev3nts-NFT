// import { useContext } from "react";
// import { TransactionContext } from "../context/TransactionContext";

function MintCollectionSize() {
  // const { collectionSize, totalSupply, account } =
  //   useContext(TransactionContext);
  return (
    <div className="text-4xl text-center pt-12 font-bold text-black uppercase">
     TotalSupply/CollectionSize 
     {/* {account ? `${totalSupply} / ${collectionSize}` : ""} */}
    </div>
  );
}

export default MintCollectionSize;
