import { useState, useEffect } from 'react';
import { searchGameVideo, YouTubeVideo } from '../services/youtube-service';

const useYouTubeVideo = (gameName: string) => {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!gameName) return;

    const fetchVideo = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const videoData = await searchGameVideo(gameName);
        setVideo(videoData);
      } catch (err) {
        setError('Failed to load video');
        console.error('YouTube video fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchVideo, 500);
    return () => clearTimeout(timeoutId);
  }, [gameName]);

  return { video, isLoading, error };
};

export default useYouTubeVideo;
