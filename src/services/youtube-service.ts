import { YouTubeVideo } from '../types';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Demo video for when API key is not available
const DEMO_VIDEO: YouTubeVideo = {
  id: 'dQw4w9WgXcQ',
  title: 'Game Trailer Demo',
  thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  channelTitle: 'Demo Channel',
  publishedAt: '2023-01-01T00:00:00Z'
};

export const searchGameVideo = async (gameName: string): Promise<YouTubeVideo | null> => {
  // If no API key is available, return demo video
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here') {
    console.log('YouTube API key not configured, using demo video');
    return DEMO_VIDEO;
  }

  try {
    const searchQuery = `${gameName} game trailer gameplay`;
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
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
    // Return demo video as fallback
    return DEMO_VIDEO;
  }
};

export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};
