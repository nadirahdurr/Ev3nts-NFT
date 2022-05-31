import React, { useEffect, useState } from 'react'

const BandDescription = (props) => {
  const [band, setBand] = useState({})

  useEffect(() => {
    if (props.band) setBand(props.band)
  }, [props.band])

  return (
    // <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-8 pb-8 md:pt-6 md:pb-2">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center">
          {/* <h1 className="h1 text-black mb-4 text-2xl md:text-4xl">
            {band.title}
          </h1> */}
            {band.description && (<span className="text-4xl" dangerouslySetInnerHTML={{ __html: band.description }}></span>)}
            {!band.description && (<span className="text-4xl">Welcome to Ev3nts NFT minting page</span>)}
            <p className="pt-2">Thank you for supporting live music, we hope you enjoyed the show!</p>
        </div>
      {/* </div> */}
    </div>
  )
}

export default BandDescription
