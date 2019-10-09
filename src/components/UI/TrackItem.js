import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";

export default function TrackItem(props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={props.track.album.name} src={props.track.album.images[1].url} />
      </ListItemAvatar>
      <ListItemText>
        {props.track.name} - {props.track.artists[0].name}
      </ListItemText>
    </ListItem>
  );
}
