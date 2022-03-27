import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationCrosshairs,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons'
import { useGoogleMap } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'

const LocationButton = ({ localizeMe }) => {
  const map = useGoogleMap()
  const [status, setStatus] = useState({
    isLoading: false,
    isDone: false,
  })
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
      className={`${
        status.isDone ? 'text-blue-700' : 'text-gray-400'
      } hover:text-blue-600 bg-white rounded-sm m-2 text-[16px] p-2 transition-colors duration-100 ease-in-out`}
      ref={ref}
      onClick={() => {
        setStatus({ ...status, isLoading: true })
        localizeMe(map, setStatus, status)
      }}
    >
      <FontAwesomeIcon
        icon={status.isLoading ? faCircleNotch : faLocationCrosshairs}
        size="xl"
        className={status.isLoading ? 'spin' : ''}
      />
    </button>
  )
}

export default LocationButton
