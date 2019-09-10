import React from "react"
import SpotifyAuthenticate from "./spotify/SpotifyAuthenticate"
import "./App.css"
import useToken from "./hooks/useToken"
import SpotifyPlayer from "./spotify/SpotifyPlayer"
import SpotifySearch from "./spotify/SpotifySearch"

const App = () => {
  const [token] = useToken("")
  return (
    <div className="App">
      {token ? (
        <div>
          <SpotifySearch token={token} />
          <SpotifyPlayer token={token} />
        </div>
      ) : (
        <SpotifyAuthenticate />
      )}
    </div>
  )
}

export default App
