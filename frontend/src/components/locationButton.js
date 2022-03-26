import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { useGoogleMap } from '@react-google-maps/api'
import React, { useEffect, useRef } from 'react'

const LocationButton = ({ localizeMe }) => {
  const map = useGoogleMap()
  const ref = useRef()
  useEffect(() => {
    if (map && ref) {
      map.controls[window.google.maps.ControlPosition['RIGHT_BOTTOM']].push(
        ref.current
      )
    }
  }, [map, ref])

  return (
    <button
      className="text-blue-600 hover:text-blue-500 bg-white rounded-sm m-2 text-[16px] p-2 transition-colors duration-100 ease-in-out"
      ref={ref}
      onClick={() => localizeMe(map)}
    >
      <FontAwesomeIcon icon={faLocationCrosshairs} size="xl" />
    </button>
  )
}

export default LocationButton
