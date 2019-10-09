import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import ShuffleIcon from "@material-ui/icons/Shuffle";

const SpotifyPlayer = props => {
  const [deviceId, setdeviceId] = useState("");
  const [currentTrack, setCurrentTrack] = useState({
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    albumArtUrl: { url: "", height: 0, width: 0 },
    playing: false,
    shuffle: false
  });

  const player = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (window.Spotify !== null) {
      player.current = new window.Spotify.Player({
        name: "Otto's Spotify Player",
        getOAuthToken: cb => {
          cb(props.token);
        }
      });
      createEventHandlers(player.current);
      player.current.connect();
    }
    return () => {
      player.current.disconnect();
    };
  }, [props.token]);

  const createEventHandlers = player => {
    player.on("initialization_error", e => {
      console.log(e);
    });
    player.on("authentication_error", e => {
      console.log(e);
    });
    player.on("account_error", e => {
      console.log(e);
    });
    player.on("playback_error", e => {
      console.log(e);
    });

    player.on("player_state_changed", state => {
      handlePlayerStateChange(state);
    });

    player.on("ready", data => {
      let { device_id } = data;
      setdeviceId(device_id);
      transferPlaybackHere(device_id);
    });
  };

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
    });
  };

  const handlePlayerStateChange = state => {
    if (state !== null) {
      console.log(state);
      const { current_track: currentTrack } = state.track_window;
      setCurrentTrack({
        trackName: currentTrack.name,
        artistName: currentTrack.artists.map(artist => artist.name).join(", "),
        albumName: currentTrack.album.name,
        albumArtUrl: currentTrack.album.images[0],
        playing: !state.paused,
        shuffle: state.shuffle
      });
    }
  };

  const onPrevClick = () => {
    player.current.previousTrack();
  };

  const onPlayClick = () => {
    player.current.togglePlay();
  };

  const onNextClick = () => {
    player.current.nextTrack();
  };

  const onShuffle = () => {
    //TODO Toggle Shuffle
  };

  return (
    <div className="spotifyPlayer">
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardMedia className={classes.cover} image={currentTrack.albumArtUrl.url} title={currentTrack.albumName} />
          <div className={classes.controls}>
            <IconButton aria-label="previous" onClick={() => onPrevClick()}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause" onClick={() => onPlayClick()}>
              {!currentTrack.playing ? (
                <PlayArrowIcon className={classes.playIcon} />
              ) : (
                <PauseIcon className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton aria-label="next" onClick={() => onNextClick()}>
              <SkipNextIcon />
            </IconButton>
            <IconButton aria-label="Shuffle" onClick={() => onShuffle()}>
              {currentTrack.shuffle ? <ShuffleIcon color="primary" /> : <ShuffleIcon color="primary" />}
            </IconButton>
          </div>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {currentTrack.artistName} - {currentTrack.trackName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentTrack.albumName}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 100
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    paddingBottom: "10px",
    marginLeft: "auto"
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default SpotifyPlayer;
