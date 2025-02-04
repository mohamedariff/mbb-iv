import { Typography } from 'antd'
import GooglePlacesAutocomplete from './components/GooglePlacesAutocompleteInput'

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20 }}>
      <Typography.Title level={2}>Google Places Autocomplete</Typography.Title>
      <GooglePlacesAutocomplete />
    </div>
  )
}

export default App
