import type { InstagramPost, InstagramFeed } from "@/types/instagram";

let cachedFeed: InstagramFeed | null = null;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const instagramService = {
  async getFeed(limit?: number): Promise<InstagramPost[]> {
    const feedLimit = limit ?? parseInt(process.env.INSTAGRAM_FEED_LIMIT ?? "6", 10);

    if (cachedFeed && Date.now() - new Date(cachedFeed.lastFetched).getTime() < CACHE_TTL) {
      return cachedFeed.posts.slice(0, feedLimit);
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return this.getPlaceholderPosts(feedLimit);
    }

    try {
      const url = `https://graph.instagram.com/${userId}/media?fields=id,media_url,thumbnail_url,permalink,caption,media_type,timestamp&limit=${feedLimit}&access_token=${accessToken}`;
      const res = await fetch(url, { next: { revalidate: 1800 } });

      if (!res.ok) {
        console.error("[Instagram] API error:", res.status);
        return this.getPlaceholderPosts(feedLimit);
      }

      const json = await res.json();
      const posts: InstagramPost[] = (json.data || []).map((p: Record<string, string>) => ({
        id: p.id,
        mediaUrl: p.media_url,
        thumbnailUrl: p.thumbnail_url || null,
        permalink: p.permalink,
        caption: p.caption || null,
        mediaType: p.media_type as InstagramPost["mediaType"],
        timestamp: p.timestamp,
      }));

      cachedFeed = { posts, lastFetched: new Date().toISOString() };
      return posts;
    } catch (error) {
      console.error("[Instagram] Fetch error:", error);
      return this.getPlaceholderPosts(feedLimit);
    }
  },

  getPlaceholderPosts(limit: number): InstagramPost[] {
    return Array.from({ length: limit }, (_, i) => ({
      id: `placeholder-${i + 1}`,
      mediaUrl: `/images/placeholders/instagram-${(i % 3) + 1}.jpg`,
      thumbnailUrl: null,
      permalink: "#",
      caption: "Follow us on Instagram for the latest dishes and offers! 🍽️",
      mediaType: "IMAGE" as const,
      timestamp: new Date().toISOString(),
    }));
  },
};
