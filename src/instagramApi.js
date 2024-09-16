import axios from "axios";

const INSTAGRAM_TOKEN =
  "IGQWRNYWxMdnJqT25xNHd5S09jb2E2NGk4NGcxemVjdDI5MUtTcVJHSktiZAlM2SXBjZAHN3NWt5aDBfZAkpDbVB1YUcxYi1iT0lHM1pvc1A5eldyUF92MVE0Tk5NXzMzcjA0SHZARaHlFWUZApMXVrTWQtZA1dTNFBzY0EZD";
const INSTAGRAM_API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_TOKEN}`;

export const fetchInstagramPosts = async () => {
  try {
    const response = await axios.get(INSTAGRAM_API_URL);
    return response.data.data
      .filter(
        (post) => post.media_type === "IMAGE" || post.media_type === "VIDEO"
      )
      .slice(0, 12);
  } catch (error) {
    console.error("Erro ao buscar posts do Instagram:", error);
    return [];
  }
};
