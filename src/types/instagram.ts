export type InstagramPost = {
  id: string;
  mediaUrl: string;
  thumbnailUrl: string | null;
  permalink: string;
  caption: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
};

export type InstagramFeed = {
  posts: InstagramPost[];
  lastFetched: string;
};
