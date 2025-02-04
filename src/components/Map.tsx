import 'leaflet/dist/leaflet.css'

import { useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// function DisplayPosition({ map }) {
//   const [position, setPosition] = useState(() => map.getCenter())

//   const onClick = useCallback(() => {
//     map.setView([51.505, -0.09], 13)
//   }, [map])

//   const onMove = useCallback(() => {
//     setPosition(map.getCenter())
//   }, [map])

//   useEffect(() => {
//     map.on('move', onMove)
//     return () => {
//       map.off('move', onMove)
//     }
//   }, [map, onMove])

//   return (
//     <p>
//       latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
//       <button onClick={onClick}>reset</button>
//     </p>
//   )
// }

function Map() {
  const [map, setMap] = useState<L.Map | null>(null)

  const center: [number, number] = [51.505, -0.09]
  const zoom = 13

  return (
    <MapContainer
      zoom={zoom}
      ref={setMap}
      center={center}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={import.meta.env.VITE_MAPBOX_API} />
    </MapContainer>
  )
}

export default Map
