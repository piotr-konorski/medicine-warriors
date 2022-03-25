import { useEffect, useState } from 'react'
import {} from ''

// function getDataFromApi(location) {
//   // TODO: set appropriate url
//   const api_url = `${window._env_.API_URL}/` || 'http://localhost:5000/'
//   try {
//     fetch(api_url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(location),
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           console.log('Successfully sent location to server')
//           return res.json()
//         } else {
//           console.log('Error sending location to server')
//         }
//       })
//       .then((data) => {
//         console.log(data)
//         return data.pharmacies
//       })
//   } catch (e) {
//     console.log(e)
//   }
// }

export default function Table() {
  const [location, setLocation] = useState(null)
  const [pharmacies, setPharmacies] = useState([])

  useEffect(() => {
    window.alert(
      'Please enable location services to get the nearest pharmacies.'
    )
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        console.log(location)
      })
      setPharmacies(getDataFromApi(location))
    } else {
      // Browser doesn't support Geolocation
      console.log("Browser doesn't support Geolocation")
    }
  }, [])
  // TODO: Style the response into a table
  return <>{JSON.stringify(pharmacies)}</>
}
