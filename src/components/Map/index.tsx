import L from 'leaflet'
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet'
import styles from './styles'
import { useRouter } from 'next/router'
import { mapBoxApiKey, mapBoxUrl } from '@/config/mapbox'
import { useCallback, useEffect, useRef } from 'react'

export type Place = {
  id: string
  name: string
  slug: string
  location: {
    latitude: number
    longitude: number
  }
}
export type MapProps = {
  places?: Place[]
}

const CustomMap = () =>
  mapBoxApiKey ? (
    <TileLayer
      url={mapBoxUrl}
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> <strong><a href="https://labs.mapbox.com/contribute/" target="_blank">Improve this map</a></strong>'
      tileSize={512}
      zoomOffset={-1}
    />
  ) : (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )

const MapContext = () => {
  const map = useMap()
  const minZoomDefault = useRef(2)

  const handleResize = useCallback(() => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    if (width < 768 && map.getMinZoom() == minZoomDefault.current) {
      map.setMinZoom(1)
      map.setZoom(2)
    } else if (width >= 768 && map.getMinZoom() != minZoomDefault.current) {
      map.setMinZoom(minZoomDefault.current)
      map.setZoom(4)
    }
  }, [map])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useMapEvents({
    resize: handleResize
  })

  return null
}

const markerIcon = new L.Icon({
  iconUrl: 'img/marker-icon.png',
  iconSize: [32, 32],
  iconAnchor: [3, 34]
})

const Map = ({ places }: MapProps) => {
  const router = useRouter()

  return (
    <MapContainer
      css={styles}
      center={[-21.245, -44.999]}
      zoom={4}
      minZoom={2}
      scrollWheelZoom={true}
      maxBounds={[
        [-180, 180],
        [180, -180]
      ]}
    >
      <MapContext />
      <CustomMap />

      {places?.map(({ id, name, location, slug }) => {
        const { latitude, longitude } = location
        const href = `/place/${slug}`

        const HandleClick = () => router.push(href)

        return (
          <Marker
            key={`place-${id}`}
            position={[latitude, longitude]}
            title={name}
            eventHandlers={{ click: HandleClick }}
            icon={markerIcon}
          />
        )
      })}
    </MapContainer>
  )
}
export default Map
