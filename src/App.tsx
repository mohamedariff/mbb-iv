import { Card, Typography } from 'antd'
import GooglePlacesAutocompleteSelect from './components/GooglePlacesAutocompleteSelect'
import Map from './components/Map'

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography.Title level={1} style={{ color: 'white' }}>
        Google Places Autocomplete
      </Typography.Title>
      <Card
        title={<GooglePlacesAutocompleteSelect />}
        bordered={false}
        styles={{ body: { width: '50vw', height: '50vh' } }}
      >
        <Map />
      </Card>
    </div>
  )
}

export default App
