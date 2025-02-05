import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchPlacePredictions, fetchCoordinates } from '../redux/placesSlice'

const GooglePlacesAutocompleteSelect = () => {
  const dispatch = useAppDispatch()
  const { places, loading } = useAppSelector((state) => state.places)

  const onSearch = debounce((value: string) => {
    if (value) {
      dispatch(fetchPlacePredictions(value))
    }
  }, 500)

  const onChange = (value: string) => {
    if (value) {
      dispatch(fetchCoordinates(value))
    }
  }

  return (
    <Select
      allowClear
      showSearch
      options={places}
      onChange={onChange}
      onSearch={onSearch}
      filterOption={false}
      optionFilterProp="label"
      style={{ width: '100%' }}
      placeholder="Search a place..."
      notFoundContent={loading ? <Spin size="small" /> : null}
    />
  )
}

export default GooglePlacesAutocompleteSelect
