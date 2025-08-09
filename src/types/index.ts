// Game related interfaces and types
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

export interface GameDetails extends Game {
  description_raw: string;
  genres: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  released: string;
  website: string;
}

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

// YouTube related types
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}
