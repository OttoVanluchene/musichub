import React, { useEffect } from "react"
import Axios from "axios"

// Example of an uris
//{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}

//TODO Context_uri for to artist / album / playlists
//{"context_uri": "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}

export default function playSelectedSong({ token, deviceId, uris }) {
  const sendSelectedSong = async () => {
    await Axios.put(
      "https://api.spotify.com/v1/me/player/play?device_id=" + deviceId,
      { uris: uris },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
  }

  useEffect(() => {
    sendSelectedSong()
  }, [])

  return "OK"
}
