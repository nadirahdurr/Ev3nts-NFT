const BandDescription = (props) => {
  return (
      <div className="pt-2 pb-2 md:pt-4 md:pb-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-bold mb-4 text-xl md:text-xl">
          {props.concert.date} - {props.concert.venue} - {props.concert.place}
          </span>
        </div>
    </div>
  )
}

export default BandDescription
