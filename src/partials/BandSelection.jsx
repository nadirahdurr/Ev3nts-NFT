import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const BandSelection = (props) => {
  const navigate = useNavigate()
  const [bands, setBands] = useState({})

  useEffect(() => {
    if (props.bands) setBands(props.bands)

  }, [props.bands])

  const selectBand = (id) => {
    navigate('../m/' + id )
  }

  return (
    <div className="pt-18 pb-4 md:pt-8 md:pb-8">
      {/* Section header */}
      <p className="text-center text-3xl pb-6">
        Welcome to Ev3nts NFT, please select the artist
      </p>
      {bands.length > 0 && (
        <div className="max-w-3xl mx-auto text-center">
          {bands.map((band) => {
            return (
              <button
                onClick={() => selectBand(band.id)}
                className="mr-1 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
                key={band.id}
              >
                {band.title} 
                
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BandSelection
