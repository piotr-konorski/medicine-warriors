import locationService from '../services/locations'

export const get_gmaps_apikey = () => {
  try {
    return window._env_.GOOGLEMAPS_API_KEY
  } catch (err) {
    return 'AIzaSyDYp1te-bQEhWE9P9yehRE3biB7LpSEh4U' // some publically available Google Maps api key
  }
}

export const getAllLocations = async () => {
  try {
    const locations = await locationService.getAll()
    // const locations = locationService.getAll_test_v2()  // ---- dev ----
    return locations
  } catch (reason) {
    console.log('Error - request: ' + reason)
    return
  }
}

export const getLocationsNearby = async (pos, distance, limit) => {
  try {
    const locations = await locationService.getNearby(pos, distance, limit)
    return locations
  } catch (reason) {
    console.log('Error - request: ' + reason)
    return
  }
}

export const MakeQuerablePromise = (promise) => {
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
