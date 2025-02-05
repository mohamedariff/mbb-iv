import 'leaflet/dist/leaflet.css'

import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useAppSelector } from '../redux/hooks'

function Map() {
  const [map, setMap] = useState<L.Map | null>(null)
  const selectedCoordinates = useAppSelector(
    (state) => state.places.selectedCoordinates
  )

  const center: [number, number] = [
    selectedCoordinates?.lat,
    selectedCoordinates?.lng
  ]

  useEffect(() => {
    if (map && selectedCoordinates) {
      map.flyTo([selectedCoordinates?.lat, selectedCoordinates?.lng], 13)
    }
  }, [selectedCoordinates, map])

  return (
    <MapContainer
      zoom={13}
      ref={setMap}
      center={center}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={import.meta.env.VITE_MAPBOX_API} />
      {selectedCoordinates && (
        <Marker position={[selectedCoordinates.lat, selectedCoordinates.lng]}>
          {selectedCoordinates?.name && (
            <Popup>{selectedCoordinates.name}</Popup>
          )}
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map
