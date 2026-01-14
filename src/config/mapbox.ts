const mapBox = {
  host: process.env.NEXT_PUBLIC_MAPBOX_HOST,
  userId: process.env.NEXT_PUBLIC_MAPBOX_USERID,
  styleId: process.env.NEXT_PUBLIC_MAPBOX_STYLEID,
  apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY
}

export const mapBoxApiKey = mapBox.apiKey

export const mapBoxUrl = `${mapBox.host}/${mapBox.userId}/${mapBox.styleId}/tiles/512/{z}/{x}/{y}@2x?access_token=${mapBox.apiKey}`
