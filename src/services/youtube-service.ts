import { YouTubeVideo } from "../types";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchGameVideo = async (gameName: string): Promise<YouTubeVideo | null> => {
  // If no API key, return a mock video for demonstration
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here') {
    return {
      id: 'demo',
      title: `${gameName} - Trailer (Demo)`,
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      channelTitle: 'Demo Channel',
      publishedAt: new Date().toISOString(),
    };
  }

  try {
    const query = `${gameName} trailer OR gameplay OR walkthrough`;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(query)}&` +
      `type=video&videoDuration=medium&videoEmbeddable=true&` +
      `maxResults=1&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        id: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
};

export const getYouTubeEmbedUrl = (videoId: string): string => {
  if (videoId === 'demo') {
    return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0';
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
};
