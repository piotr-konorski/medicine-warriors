import { Marker, useGoogleMap } from '@react-google-maps/api'

export default function CurrentLocation(props) {
  const map = useGoogleMap()
  return (
    <>
      <Marker
        position={props.location}
        icon={{
          fillColor: '#4285F4',
          fillOpacity: 1,
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          strokeColor: 'rgb(255,255,255)',
          strokeWeight: 2,
        }}
        onClick={() => {
          map.setZoom(map.getZoom() + 1)
          map.panTo(props.location)
        }}
      />
    </>
  )
}
