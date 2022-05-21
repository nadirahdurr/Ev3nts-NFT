// import { useContext } from "react";
// import { TransactionContext } from "../context/TransactionContext";
import { XCircleIcon } from "@heroicons/react/solid";

export default function MintErrorBanner() {
  // const { error } = useContext(TransactionContext);
  return (
    <div className="bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {/* Error code: {error} */}
          </h3>
        </div>
      </div>
    </div>
  );
}
