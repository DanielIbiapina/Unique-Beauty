import axios from "axios";

const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN;
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
