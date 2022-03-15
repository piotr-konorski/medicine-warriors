async function getAll() {
  // const response = await fetch( `${window._env_.API_URL}/locations` )
  const response = await fetch( `http://localhost:5000/locations_test` )
  const data_json = await response.json()
  // console.log(json)
  return data_json
  
}

export default {
  getAll
}