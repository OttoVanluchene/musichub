import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import usePlaySelected from "../hooks/usePlaySelected";

export default function ArtistItem(props) {
  const [playSelected] = usePlaySelected();
  return (
    <ListItem>
      <ListItemAvatar
        onClick={() => {
          playSelected({ token: props.token, uris: null, context_uri: props.artist.uri });
        }}
      >
        {props.artist.images && props.artist.images.length && (
          <Avatar alt={props.artist.name} src={props.artist.images[1].url} />
        )}
      </ListItemAvatar>
      <ListItemText>{props.artist.name}</ListItemText>
    </ListItem>
  );
}
