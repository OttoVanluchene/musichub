import React from "react"
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core"

export default function AlbumItem(props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={props.album.name} src={props.album.images[1].url} />
      </ListItemAvatar>
      <ListItemText>
        {props.album.name} - {props.album.artists[0].name}
      </ListItemText>
    </ListItem>
  )
}
