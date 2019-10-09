import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";

export default function ArtistItem(props) {
  return (
    <ListItem>
      <ListItemAvatar>
        {props.artist.images && props.artist.images.length && (
          <Avatar alt={props.artist.name} src={props.artist.images[1].url} />
        )}
      </ListItemAvatar>
      <ListItemText>{props.artist.name}</ListItemText>
    </ListItem>
  );
}
