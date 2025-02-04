import { useState, useCallback } from 'react'
import { Input, List, Spin } from 'antd'
import debounce from 'lodash.debounce'
import { fetchGooglePlace, getCoordinatesByPlaceId } from '../utils'

const GooglePlacesAutocomplete = () => {
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [predictions, setPredictions] = useState([])

  // Function to fetch predictions from the Google Places Autocomplete API
  const fetchPredictions = async (query: string) => {
    if (!query) return setPredictions([])
    setLoading(true)
    try {
      const response = await fetchGooglePlace(query)
      setPredictions(response || [])
    } catch (error) {
      console.error('Error fetching predictions:', error)
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  // Create a debounced version of the API call to reduce the number of requests
  const debouncedFetch = useCallback((value: string) => {
    debounce((query: string) => {
      fetchPredictions(query)
    }, 300)(value)
  }, [])

  // Handle changes in the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedFetch(value)
  }

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20 }}>
      <Input
        placeholder="Search for a place"
        value={inputValue}
        onChange={handleInputChange}
      />

      {loading && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Spin />
        </div>
      )}

      {predictions.length > 0 && (
        <List
          bordered
          dataSource={predictions}
          renderItem={(item) => (
            <List.Item onClick={() => getCoordinatesByPlaceId(item.place_id)}>
              {item.description}
            </List.Item>
          )}
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  )
}

export default GooglePlacesAutocomplete
