import { Card, Typography } from 'antd'
import GooglePlacesAutocompleteSelect from './components/GooglePlacesAutocompleteSelect'
import Map from './components/Map'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography.Title level={1} style={{ color: 'white' }}>
        Google Places Autocomplete
      </Typography.Title>

      <ErrorBoundary>
        <Card
          title={<GooglePlacesAutocompleteSelect />}
          bordered={false}
          styles={{ body: { width: '50vw', height: '50vh' } }}
        >
          <Map />
        </Card>
      </ErrorBoundary>
    </div>
  )
}

export default App
