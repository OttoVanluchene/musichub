import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import usePlaySelected from "../hooks/usePlaySelected";

export default function PlaylistItem(props) {
  const [playSelected] = usePlaySelected();
  return (
    <ListItem>
      <ListItemAvatar
        onClick={() => {
          playSelected({ token: props.token, uris: null, context_uri: props.playlist.uri });
        }}
      >
        {props.playlist.images && props.playlist.images.length && props.playlist.images[1] && (
          <Avatar alt={props.playlist.name} src={props.playlist.images[1].url} />
        )}
      </ListItemAvatar>
      <ListItemText>{props.playlist.name}</ListItemText>
    </ListItem>
  );
}
