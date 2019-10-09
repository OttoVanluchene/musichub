import { useEffect, useState } from "react";
import Axios from "axios";

export default function usePlaySelected() {
  const [data, setData] = useState({ token: "", uris: null, context_uri: null });

  useEffect(() => {
    const sendSelectedTrack = async () => {
      await Axios.put(
        "https://api.spotify.com/v1/me/player/play",
        { uris: data.uris, context_uri: data.context_uri },
        {
          headers: {
            authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json"
          }
        }
      );
    };

    console.log(data);
    sendSelectedTrack();
  }, [data]);

  return [setData];
}
