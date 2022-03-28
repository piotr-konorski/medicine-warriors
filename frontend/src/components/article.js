import { content } from './website-content'
import parse from 'html-react-parser'
import { useState, useEffect } from 'react'
import { getLocationsNearby, MakeQuerablePromise } from './helpers'

export default function Aricle(props) {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    if (props.location) {
      const distance = 10000
      const limit_locations = 5
      let locationsNearbyPromise = MakeQuerablePromise(
        getLocationsNearby(props.location, distance, limit_locations)
      )
      locationsNearbyPromise.then(function (locations) {
        if (
          locations &&
          locations !== 'undefined' &&
          'locations' in locations
        ) {
          setLocations(locations.locations)
        }
      })
    }
  }, [props.location])

  return (
    <div className="p-6 md:py-14 flex items-center justify-center flex-col text-slate-900">
      {/* {props.location && (
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl md:text-4xl font-bold">Найближчі аптеки</h1>
          <h2 className="text-xl md:text-2xl font-semibold my-0.5">
            Nearest pharmacies
          </h2>
          {locations.map((loc) => {
            return (
              <div key={loc.id}>
                <h3 className="font-semibold">{loc.name}</h3>
                <p>{loc.address}</p>
                <p>{loc.contact}</p>
              </div>
            )
          })}
          <hr className="my-6 md:my-10" />
        </div>
      )} */}

      {/* ************ */}


      {/* <div class="accordion" id="accordionExample">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingOne">
            <button class="
              accordion-button
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
              aria-controls="collapseOne">
              Найближчі аптеки
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body py-4 px-5">

            </div>
          </div>
        </div>
      </div> */}



      {/* ************ */}

      {content.map(({ id, header, subheader, type, content, omitSeparator }) => {
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
            {!omitSeparator && <hr className="my-6 md:my-10" />}
          </div>
        )
      })}
    </div>
  )
}
