import { YouTubeVideo } from '../types';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Demo video for when API key is not available (dev only)
const DEMO_VIDEO: YouTubeVideo = {
  id: 'dQw4w9WgXcQ',
  title: 'Game Trailer Demo',
  thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  channelTitle: 'Demo Channel',
  publishedAt: '2023-01-01T00:00:00Z'
};

export const searchGameVideo = async (gameName: string): Promise<YouTubeVideo | null> => {
  // If no API key: in dev, use a demo video; in prod, show nothing
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here') {
    if (import.meta.env.DEV) {
      console.log('YouTube API key not configured (DEV), using demo video');
      return DEMO_VIDEO;
    }
    return null;
  }

  try {
    // Prefer official trailers; fall back to gameplay
    const searchQuery = `${gameName} official game trailer`;
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoEmbeddable=true&maxResults=1&order=relevance&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        id: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    // In prod, don't show an unrelated demo video
    return import.meta.env.DEV ? DEMO_VIDEO : null;
  }
};

export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};
