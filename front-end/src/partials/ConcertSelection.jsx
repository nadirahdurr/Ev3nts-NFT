import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ConcertSelection = (props) => {
  const navigate = useNavigate()
  const { bandId } = useParams()
  const [band, setBand] = useState({})
  const [concerts, setConcerts] = useState({})

  useEffect(() => {
    if (props.band) {
      setBand(props.band)
      if (props.band.concerts && props.band.concerts.length > 0)
        setConcerts(props.band.concerts)
    }
  }, [props.band])

  const selectConcert = (id) => {
    navigate('../m/' + bandId + '/' + id)
  }

  return (
    <div className="pt-2 pb-4 md:pt-4 md:pb-8">
      {/* Section header */}
      {concerts.length > 0 && (
        <div className="max-w-3xl mx-auto text-center">
          {concerts.map((concert) => {
            return (
              <div>
                <button
                  onClick={() => selectConcert(concert.concertCode)}
                  className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none focus:shadow-outline w-4/6"
                  type="button"
                  key={concert.concertCode}
                >
                  {concert.date} - {concert.venue} - {concert.place}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ConcertSelection
