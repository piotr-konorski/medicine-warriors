import { content } from './website-content'
import { legendItems } from './legend-items'
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
    <div className="p-6 md:py-1 flex items-center justify-center flex-col text-slate-900 ">
      {/* legend */}
      {legendItems && (
        <div className="max-w-3xl w-full py-5 flex flex-col text-sm md:flex-row md:pt-10 gap-2 md:gap-5">
          {legendItems.map(({ id, image, alt, title }) => {
            return (
              <div
                key={id}
                className="max-h-full flex flex-row items-center text-xs md:text-sm w-full gap-1"
              >
                <img
                  className="max-h-full max-w-[30px] w-auto h-auto md:max-w-[50px]"
                  src={image}
                  alt={alt}
                />
                <span className="text-slate-900">{title}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* accordeon with table of nearby locations */}
      {props.location && (
        <div
          className="accordion accordion-flush max-w-3xl w-full"
          id="accordionFlushExample"
        >
          <div className="accordion-item border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
            <h2 className="accordion-header mb-0" id="flush-headingTwo">
              <button
                className="accordion-button collapsed relative flex items-center w-full py-4 px-5
                                text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Найближчі аптеки - перелік
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse border-0 collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body py-4 px-5">
                <table className="table-auto md:table-fixed text-xs">
                  <thead>
                    <tr>
                      <th>Відстань</th>
                      <th>Назва аптеки</th>
                      <th>Адреса</th>
                      <th>Контакти</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc) => {
                      let locAddress = loc.address
                      if (locAddress.includes('_location_')) {
                        locAddress = locAddress.split('_')[0]
                      }

                      let locContact = null
                      if (loc.contact !== null && loc.contact !== undefined)
                        locContact = loc.contact
                      if (
                        loc.contact_type !== null &&
                        loc.contact_type !== undefined
                      ) {
                        locContact = loc.contact_type
                        if (
                          loc.contact_person !== null &&
                          loc.contact_person !== undefined
                        )
                          locContact += ` : ${loc.contact_person}`
                        if (
                          loc.contact_phone !== null &&
                          loc.contact_phone !== undefined
                        )
                          locContact += ` (${loc.contact_phone})`
                      }

                      return (
                        <tr key={loc.id} className="hover:bg-gray-200">
                          <td className="border border-slate-300">
                            {parseFloat(loc.distance).toFixed(1)} km
                          </td>
                          <td className="border border-slate-300">
                            {loc.name}
                          </td>
                          <td className="border border-slate-300">
                            {locAddress}
                          </td>
                          <td className="border border-slate-300">
                            {locContact !== null && locContact}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* space separator */}
      <div className="md:py-4" />

      {/* text sections */}
      {content.map(
        ({ id, header, subheader, type, content, omitSeparator }) => {
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
        }
      )}
    </div>
  )
}
