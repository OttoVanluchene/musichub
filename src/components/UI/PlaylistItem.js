import React from "react"
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core"

export default function PlaylistItem(props) {
  console.log(props)
  return (
    <ListItem>
      <ListItemAvatar>
        {props.playlist.images && props.playlist.images.length && props.playlist.images[1] && (
          <Avatar alt={props.playlist.name} src={props.playlist.images[1].url} />
        )}
      </ListItemAvatar>
      <ListItemText>{props.playlist.name}</ListItemText>
    </ListItem>
  )
}
