import React, { useState } from 'react'
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api'
import locationService from '../services/locations'

const map_center = { lat: 49.339110578227455, lng: 31.602030139697213 } // roughly center of Ukraine

function get_gmaps_apikey() {
  try {
    return window._env_.GOOGLEMAPS_API_KEY
  } catch (err) {
    return 'AIzaSyDYp1te-bQEhWE9P9yehRE3biB7LpSEh4U' // some publically available Google Maps api key
  }
}
const GMAPS_API_KEY = get_gmaps_apikey()

const getDataFromApi = async () => {
  try {
    const locations = await locationService.getAll()
    // const locations = locationService.getAll_test_v2()  // ---- dev ----
    return locations
  } catch (reason) {
    console.log('Error - request: ' + reason)
    return
  }
}

function MakeQuerablePromise(promise) {
  if (promise.isFulfilled) return promise

  var isPending = true
  var isRejected = false
  var isFulfilled = false

  var result = promise.then(
    function (v) {
      isFulfilled = true
      isPending = false
      return v
    },
    function (e) {
      isRejected = true
      isPending = false
      throw e
    }
  )

  result.isFulfilled = function () {
    return isFulfilled
  }
  result.isPending = function () {
    return isPending
  }
  result.isRejected = function () {
    return isRejected
  }
  return result
}

const Map = (props) => {
  const [markers, setMarkers] = useState([])
  const [activeMarker, setActiveMarker] = useState(null)

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const onLoad = React.useCallback(function callback(map) {
    var locationsPromise = MakeQuerablePromise(getDataFromApi())
    locationsPromise.then(function (locations) {
      if (locations && locations !== 'undefined' && 'locations' in locations) {
        setMarkers(locations.locations);
      }
    })
  }, [])

  return (
    <div id={props.id}>
      <LoadScript googleMapsApiKey={GMAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="map"
          center={map_center}
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

                let locName = marker.name
                if (marker.google_name !== null)
                  locName = locName + ' ('+marker.google_name+')'
                
                let locAddress = marker.address
                if (marker.google_address !== null)
                  locAddress = marker.google_address
                
                let locContact = null
                if (marker.contact !== null)
                  locContact = 'Contact: ' + marker.contact
                
                let locTel = null
                if (marker.google_international_phone_number !== null)
                  locTel = marker.google_international_phone_number
                else if (marker.google_formatted_phone_number !== null)
                  locTel = marker.google_formatted_phone_number
                
                let locMapUrl = null
                if (marker.google_map_url !== null)
                  locMapUrl = marker.google_map_url
                
                let locUrl = null
                if (marker.google_url !== null)
                  locUrl = marker.google_url

                return (
                  <Marker
                    key={marker.id}
                    position={{
                      lat: parseFloat(locLat),
                      lng: parseFloat(locLng),
                    }}
                    clusterer={clusterer}
                    icon={{
                      url: '/map_markers/green_marker.png',
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
                          <h1 className="h1_info" >{locName}</h1>
                          {locAddress}
                          {locContact !== null && 
                            <div>
                              {locContact}
                            </div>
                          }
                          
                          {locTel !== null && 
                            <div>
                              <a className="a_info" href="tel:{locTel}">{locTel}</a>
                            </div>
                          }
                          {locMapUrl !== null && 
                            <div>
                              <br/>
                              Google Maps: <a className="a_info" href="{locMapUrl}">{locMapUrl}</a>
                            </div>
                          }

                          {locUrl !== null && 
                            <div>
                              <br/>
                              www: <a className="a_info" href="{locUrl}">{locUrl}</a>
                            </div>
                          }
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
