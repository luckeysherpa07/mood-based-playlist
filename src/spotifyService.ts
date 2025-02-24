import axios from "axios";

const CLIENT_ID = "7f79dd0f587440d0b87182ec2b7c3062";
const CLIENT_SECRET = "ee04de559b1248949221f750e2bb8662";

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
      },
    }
  );

  return response.data.access_token;
};

export const fetchSongsByMood = async (mood: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.playlists.items;
};
