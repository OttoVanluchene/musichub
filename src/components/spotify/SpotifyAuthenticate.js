import React from "react"
import { authEndpoint, clientId, redirectUri, scopes } from "../../config"

export default function SpotifyAuthenticate() {
  return (
    <a
      className="btn btn--loginApp-link"
      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`}
    >
      Login to Spotify
    </a>
  )
}
