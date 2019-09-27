import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import usePlaySelected from "../hooks/usePlaySelected";

export default function AlbumItem(props) {
  const [playSelected] = usePlaySelected();
  return (
    <ListItem>
      <ListItemAvatar
        onClick={() => {
          playSelected({ token: props.token, uris: null, context_uri: props.album.uri });
        }}
      >
        <Avatar alt={props.album.name} src={props.album.images[1].url} />
      </ListItemAvatar>
      <ListItemText>
        {props.album.name} - {props.album.artists[0].name}
      </ListItemText>
    </ListItem>
  );
}
