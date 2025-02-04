import axios from 'axios'

export const fetchGooglePlace = async (input: string) => {
  const endpoint = '/api/maps/api/place/autocomplete/json'
  const key = import.meta.env.VITE_GOOGLE_PLACES_KEY
  try {
    const response = await axios.get(endpoint, { params: { input, key } })
    return response.data.predictions
  } catch (error) {
    console.error('Error fetching autocomplete data:', error)
    throw error
  }
}
