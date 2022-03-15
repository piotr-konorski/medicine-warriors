async function getAll() {
  const api_url = `${window._env_.API_URL}/locations` || 'http://localhost:5000/locations_test'
  const response = await fetch( api_url )
  const data_json = await response.json()
  return data_json
  
}

export default {
  getAll
}