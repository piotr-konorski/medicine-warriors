import { content } from './website-content'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { getLocationsNearby, MakeQuerablePromise } from './helpers'

export default function Aricle() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    window.alert(
      'Please enable location services to get the nearest pharmacies.'
    )
    if (navigator.geolocation) {
      let loc
      navigator.geolocation.getCurrentPosition((position) => {
        loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
      let locationsNearbyPromise = MakeQuerablePromise(
        getLocationsNearby(loc, 5, 20)
      )
      locationsNearbyPromise.then((locations) => {
        if (
          locations &&
          locations !== 'undefined' &&
          'locations' in locations
        ) {
          console.log('locationsNearby:', locations.locations)
          setLocations(locations.locations)
        }
      })
    } else {
      // Browser doesn't support Geolocation
      console.log("Browser doesn't support Geolocation")
    }
  }, [])

  return (
    <div className="p-6 md:py-14 flex items-center justify-center flex-col text-slate-900">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold">Найближчі аптеки</h1>
        <h2 className="text-xl md:text-2xl font-semibold my-0.5">
          Nearest pharmacies
        </h2>
        {locations.map((loc) => {
          return (
            <>
              <h3 className="font-semibold">{loc.name}</h3>
              <p>{loc.address}</p>
              <p>{loc.contact}</p>
            </>
          )
        })}
        <hr className="my-6 md:my-10" />
      </div>

      {content.map(({ id, header, subheader, type, content, last }) => {
        return (
          <div key={id} id={id} className="max-w-3xl w-full">
            <h1 className="text-2xl md:text-4xl font-bold">
              {header && parse(header)}
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold my-0.5">
              {subheader && parse(subheader)}
            </h2>

            {/* text */}
            {!type && <p>{content && content.map((p) => parse(p))}</p>}

            {/* partner logos */}
            {type === 'inline' && (
              <div className="flex flex-item">
                {content && content.map((p) => parse(p))}
              </div>
            )}

            {/* horizonal bar */}
            {!last && <hr className="my-6 md:my-10" />}
          </div>
        )
      })}
    </div>
  )
}
