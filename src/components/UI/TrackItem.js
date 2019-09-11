import React from "react"
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core"
import usePlaySelected from "../hooks/usePlaySelected"

export default function TrackItem(props) {
  const [playSelected] = usePlaySelected()
  return (
    <ListItem>
      <ListItemAvatar
        onClick={() => {
          playSelected({ token: props.token, uris: [props.track.uri], context_uri: {} })
        }}
      >
        <Avatar alt={props.track.album.name} src={props.track.album.images[1].url} />
      </ListItemAvatar>
      <ListItemText>
        {props.track.name} - {props.track.artists[0].name}
      </ListItemText>
    </ListItem>
  )
}
