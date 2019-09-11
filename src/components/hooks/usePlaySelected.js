import React, { useEffect, useState } from "react"
import Axios from "axios"

export default function usePlaySelected() {
  const [data, setData] = useState({ token: "", uris: null, context_uri: null })

  const sendSelectedTrack = async () => {
    console.log(data)
    await Axios.put(
      "https://api.spotify.com/v1/me/player/play",
      { uris: data.uris },
      {
        headers: {
          authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json"
        }
      }
    )
  }

  useEffect(() => {
    if (data.uris !== null) {
      sendSelectedTrack()
    }
  }, [data.uris])

  return [setData]
}
