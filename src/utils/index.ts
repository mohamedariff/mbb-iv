import axios from 'axios'

const key = import.meta.env.VITE_GOOGLE_PLACES_KEY

export const fetchGooglePlace = async (input: string) => {
  const endpoint = '/api/maps/api/place/autocomplete/json'

  try {
    const response = await axios.get(endpoint, { params: { input, key } })
    return response.data.predictions
  } catch (error) {
    console.error('Error fetching autocomplete data:', error)
    throw error
  }
}

export const getCoordinatesByPlaceId = async (placeId: string) => {
  const endpoint = '/api/maps/api/place/details/json'
  try {
    const response = await axios.get(endpoint, {
      params: { place_id: placeId, key }
    })

    // The geometry property is found in `response.data.result.geometry`
    const result = response.data.result

    if (result?.geometry?.location) {
      const { lat, lng } = result.geometry.location
      return { lat, lng }
    } else {
      throw new Error('Coordinates not found in the response.')
    }
  } catch (error) {
    console.error('Error fetching place details:', error)
    throw error
  }
}
