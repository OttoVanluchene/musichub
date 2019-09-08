import React, { useRef, useState, useEffect } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import SkipNextIcon from "@material-ui/icons/SkipNext"

const SpotifyPlayer = props => {
  const [deviceId, setdeviceId] = useState("")
  const [currentTrack, setCurrentTrack] = useState({
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    albumArtUrl: { url: "", height: 0, width: 0 }
  })

  const player = useRef(null)
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    if (window.Spotify !== null) {
      console.log("Token: " + props.token)
      player.current = new window.Spotify.Player({
        name: "Otto's Spotify Player",
        getOAuthToken: cb => {
          cb(props.token)
        }
      })
      createEventHandlers(player.current)
      player.current.connect()
    }
    return () => {
      player.current.disconnect()
    }
  }, [props.token])

  const createEventHandlers = player => {
    player.on("initialization_error", e => {
      console.log(e)
    })
    player.on("authentication_error", e => {
      console.log(e)
    })
    player.on("account_error", e => {
      console.log(e)
    })
    player.on("playback_error", e => {
      console.log(e)
    })

    player.on("player_state_changed", state => {
      console.log(state)
      handlePlayerStateChange(state)
    })

    player.on("ready", data => {
      let { device_id } = data
      setdeviceId(device_id)
      transferPlaybackHere(device_id)
    })
  }

  const transferPlaybackHere = deviceId => {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true
      })
    })
  }

  const handlePlayerStateChange = state => {
    if (state !== null) {
      const { current_track: currentTrack } = state.track_window
      setCurrentTrack({
        trackName: currentTrack.name,
        artistName: currentTrack.artists.map(artist => artist.name).join(", "),
        albumName: currentTrack.album.name,
        albumArtUrl: currentTrack.album.images[0],
        playing: !state.paused
      })
    }
  }

  const onPrevClick = () => {
    player.current.previousTrack()
  }

  const onPlayClick = () => {
    player.current.togglePlay()
  }

  const onNextClick = () => {
    player.current.nextTrack()
  }

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {currentTrack.artistName} - {currentTrack.trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {currentTrack.albumName}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous" onClick={() => onPrevClick()}>
            {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={() => onPlayClick()}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next" onClick={() => onNextClick()}>
            {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia className={classes.cover} image={currentTrack.albumArtUrl.url} title={currentTrack.albumName} />
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}))

export default SpotifyPlayer
