import React from "react"
import SpotifyAuthenticate from "./spotify/SpotifyAuthenticate"
import "./App.css"
import useToken from "./hooks/useToken"
import SpotifyPlayer from "./spotify/SpotifyPlayer"

const App = () => {
  const [token] = useToken("")

  // TODO Save deviceId in ContextAPI around the app
  // const onPlaySelected = async () => {
  //   await Axios.put(
  //     "https://api.spotify.com/v1/me/player/play?device_id=" + deviceId,
  //     { uris: ["spotify:track:1xj9Mdr9jtBpRA6WqqMYbn"] },
  //     {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   )
  // }

  return <div className="App">{token ? <SpotifyPlayer token={token} /> : <SpotifyAuthenticate />}</div>
}

export default App
