import { notification } from 'antd'
import axios from 'axios'

const key = import.meta.env.VITE_GOOGLE_PLACES_KEY

export const fetchGooglePlace = async (input: string) => {
  const endpoint = '/api/maps/api/place/autocomplete/json'

  try {
    const response = await axios.get(endpoint, { params: { input, key } })
    if (response.data.status !== 'OK') {
      return notification.error({
        message: response.data.status,
        description: response.data.error_message
      })
    }
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
      return { lat, lng, name: result.formatted_address }
    } else {
      throw new Error('Coordinates not found in the response.')
    }
  } catch (error) {
    console.error('Error fetching place details:', error)
    throw error
  }
}
