import { useState } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { fetchGooglePlace, getCoordinatesByPlaceId } from '../utils'

type Place = {
  description: string
  matched_substrings: {
    length: number
    offset: number
  }[]
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: {
      length: number
      offset: number
    }[]
    secondary_text: string
  }
  terms: {
    offset: number
    value: string
  }[]
  types: string[]
}

const GooglePlacesAutocompleteSelect = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [options, setOptions] = useState([])

  const fetchPredictions = async (query: string) => {
    setIsFetching(true)
    try {
      const response = await fetchGooglePlace(query)
      const createOptions = response.map((place: Place) => {
        return { value: place.place_id, label: place.description }
      })
      setOptions(createOptions)
    } catch (error) {
      console.error('Error fetching predictions:', error)
      setOptions([])
    } finally {
      setIsFetching(false)
    }
  }

  const onSearch = debounce((value: string) => {
    fetchPredictions(value)
  }, 500)

  const onChange = async (value: string) => {
    console.log(`selected ${value}`)
    if (!value) return
    const latLng = await getCoordinatesByPlaceId(value)
    console.log('=======latLng:', latLng)
  }

  return (
    <Select
      allowClear
      showSearch
      options={options}
      onChange={onChange}
      onSearch={onSearch}
      filterOption={false}
      optionFilterProp="label"
      style={{ width: '100%' }}
      placeholder="Search a place..."
      notFoundContent={isFetching ? <Spin size="small" /> : null}
    />
  )
}

export default GooglePlacesAutocompleteSelect
