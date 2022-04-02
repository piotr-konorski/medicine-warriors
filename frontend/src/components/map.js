import React, { useState } from 'react'
import parse from 'html-react-parser'

import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api'

import {
  get_gmaps_apikey,
  getLastUpdate,
  getAllLocations,
  MakeQuerablePromise,
} from './helpers'

import LocationButton from './locationButton'
import CurrentLocation from './currentLocation'

const Map = (props) => {
  const GMAPS_API_KEY = get_gmaps_apikey()
  const [markers, setMarkers] = useState([])
  const [activeMarker, setActiveMarker] = useState(null)

  // initial map center: roughly center of Ukraine
  const mapCenter = props.location ?? {
    lat: 49.339110578227455,
    lng: 31.602030139697213,
  }

  const marker_types = ['pharmacy', 'storage', 'location_cukrzyca.pl']
  const map_icons = {
    default: '/map_markers/blue_marker.png',
    pharmacy: '/map_markers/blue_marker.png',
    storage: '/map_markers/blue_marker.png',
    'location_cukrzyca.pl': '/map_markers/green_marker.png',
  }

  const handleActiveMarker = (marker_id) => {
    if (marker_id === activeMarker) {
      setActiveMarker(null)
    }
    setActiveMarker(marker_id)
  }

  const onLoad = React.useCallback(function callback(map) {
    // get all locations
    const locationsPromise = MakeQuerablePromise(getAllLocations())
    locationsPromise.then(function (locations) {
      if (locations && locations !== 'undefined' && 'locations' in locations) {
        setMarkers(locations.locations)
      }
    })

    // set lastUpdated info
    const lastUpdatePromise = MakeQuerablePromise(getLastUpdate())
    lastUpdatePromise.then(function (lastUpdate) {
      if (lastUpdate && lastUpdate !== 'undefined' && 'last_update' in lastUpdate) {
        const lastUpdateTxt = lastUpdate.last_update;
        var lastUpdateStatus = document.getElementById('lastUpdateStatus');
        lastUpdateStatus.innerHTML = `Останнє оновлення: ${lastUpdateTxt}`;
      }
    })

  }, [])

  const localizeMe = (map, setStatus, status) => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng }
        // const pos = { lat: 49.8396820, lng: 24.0297150 }  // DEV: center of Lviv
        props.setLocation(pos)

        // set map accordingly
        map.panTo(pos)
        map.setZoom(15)
        setStatus({ ...status, isLoading: false, isError: false, isDone: true })
      },
      function (positionError) {
        console.log('Geolocation not available:', positionError)
        setStatus({ ...status, isLoading: false, isError: true, isDone: false })
        window.alert('Geolocation not available')
      }
    )
  }

  return (
    <div id={props.id} className="relative">
      <LoadScript googleMapsApiKey={GMAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="map"
          center={mapCenter}
          zoom={7}
          onLoad={onLoad}
          version="weekly"
          options={{
            minZoom: 6,
            gestureHandling: 'cooperative',
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }}
          on
        >
          <LocationButton localizeMe={localizeMe} />
          {props.location && <CurrentLocation location={props.location} />}
          
          <MarkerClusterer
            styles={[
              {
                url: '/map_markers/clustering/blue/m1.png',
                width: '53',
                height: '52',
                textColor: 'white',
                textSize: '15',
                anchorText: ['1', '0'],
                anchorIcon: ['0', '0'],
              },
              {
                url: '/map_markers/clustering/blue/m2.png',
                width: '56',
                height: '55',
                textColor: 'white',
                textSize: '14',
                anchorText: ['1', '0'],
                anchorIcon: ['0', '0'],
              },
              {
                url: '/map_markers/clustering/blue/m3.png',
                width: '66',
                height: '65',
                textColor: 'white',
                textSize: '14',
                anchorText: ['1', '0'],
                anchorIcon: ['0', '0'],
              },
              {
                url: '/map_markers/clustering/blue/m4.png',
                width: '78',
                height: '77',
                textColor: 'white',
                textSize: '14',
                anchorText: ['1', '0'],
                anchorIcon: ['0', '0'],
              },
              {
                url: '/map_markers/clustering/blue/m5.png',
                width: '90',
                height: '89',
                textColor: 'white',
                textSize: '12',
                anchorText: ['1', '0'],
                anchorIcon: ['0', '0'],
              },
            ]}
            averageCenter
            maxZoom={17}
          >
            {(clusterer) =>
              markers.map((marker) => {
                let locLat = marker.latitude
                if (marker.google_latitude !== null)
                  locLat = marker.google_latitude

                let locLng = marker.longitude
                if (marker.google_latitude !== null)
                  locLng = marker.google_longitude

                let locType = marker.type
                if (!marker_types.includes(locType)) locType = 'default'

                let locName = marker.name
                if (marker.google_name !== null)
                  locName = locName + ' (' + marker.google_name + ')'

                let locAddress = marker.address
                if (marker.google_address !== null)
                  locAddress = marker.google_address
                
                // handle special location without address - Cukrzyca.pl
                if (locAddress.includes('_location_')) locAddress = null

                let locContact = null
                if (marker.contact !== null)
                  locContact = 'Contact: ' + marker.contact
                if (marker.contact_type !== null) {
                  locContact = `Contact: ${marker.contact_type}`
                  if (marker.contact_person !== null)
                    locContact += `<br /> ${marker.contact_person}`
                  if (marker.contact_phone !== null)
                    locContact += `<br /> ${marker.contact_phone}`
                }

                let locTel = null
                if (marker.google_international_phone_number !== null)
                  locTel = 'tel:' + marker.google_international_phone_number
                else if (marker.google_formatted_phone_number !== null)
                  locTel = 'tel:' + marker.google_formatted_phone_number

                let locMapUrl = null
                if (marker.google_map_url !== null)
                  locMapUrl = marker.google_map_url

                let locUrl = null
                if (marker.google_url !== null && marker.google_url !== '') locUrl = marker.google_url
                if (marker.website_link !== null && marker.website_link !== '') locUrl = marker.website_link

                let locInfo = null
                if (marker.info !== null)
                  locInfo = marker.info

                let locUrgentInfo = null
                if (marker.urgent_info !== null)
                  locUrgentInfo = marker.urgent_info
                
                if (marker.last_transport !== null)
                  locUrgentInfo = `Останній транспорт інсуліну: ${marker.last_transport}`

                return (
                  <Marker
                    key={marker.id}
                    position={{
                      lat: parseFloat(locLat),
                      lng: parseFloat(locLng),
                    }}
                    clusterer={clusterer}
                    icon={{
                      url: `${map_icons[locType]}`,
                      scaledSize: { width: 40, height: 40 },
                      labelOrigin: { x: 16, y: -10 },
                    }}
                    onClick={() => handleActiveMarker(marker.id)}
                  >
                    {activeMarker === marker.id ? (
                      <InfoWindow
                        onCloseClick={() => setActiveMarker(null)}
                        options={{
                          pixelOffset: {
                            width: 0,
                            height: 0,
                          },
                          maxWidth: 320,
                          maxHeight: 320,
                        }}
                      >
                        <div>
                          <h1 className="h1_info">{locName}</h1>
                          {locAddress}
                          {locContact !== null && <div><br />{parse(locContact)}</div>}

                          {locTel !== null && (
                            <div>
                              <a className="a_info" href={locTel}>
                                {locTel}
                              </a>
                            </div>
                          )}
                          {locMapUrl !== null && (
                            <div>
                              <br />
                              Google Maps:{' '}
                              <a className="a_info" href={locMapUrl}>
                                {locMapUrl}
                              </a>
                            </div>
                          )}

                          {locUrl !== null && (
                            <div>
                              <br />
                              www:{' '}
                              <a className="a_info" href={locUrl}>
                                {locUrl}
                              </a>
                            </div>
                          )}

                          {locInfo && locInfo !== null && (
                            <div>
                              <br />
                              <p className="markerInfo">{locInfo}</p>
                            </div>
                          )}

                          {locUrgentInfo && locUrgentInfo !== null && (
                            <div>
                              <br />
                              <p className="markerUrgentInfo">
                                {locUrgentInfo}
                              </p>
                            </div>
                          )}
                        </div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                )
              })
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>

      <div id="lastUpdateStatus" className="absolute top-0 right-1 text-l text-red-700 font-semibold bg-gray-100 bg-opacity-80 px-2" />

    </div>
  )
}

export default Map

// main docs: https://react-google-maps-api-docs.netlify.app/
// markers: https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js
// map with drawing polygon: https://codesandbox.io/s/quizzical-poitras-i9rg3?file=/src/styles.css:0-178
// handle promise: https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved
// dynamic adding markers: https://stackoverflow.com/questions/70931285/how-to-re-center-react-google-maps-on-adding-marker
// gmaps in react: https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
// in Vue - blog on Google Maps, clusters, markers within bounds etc: https://tighten.com/blog/improving-google-maps-performance-on-large-datasets/
