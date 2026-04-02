import { vi } from "vitest";

export const instagramMock = {
  posts: [
    {
      id: "ig-1",
      caption: "Delicious Chicken Tikka Masala 🔥",
      media_url: "https://instagram.com/test/photo1.jpg",
      permalink: "https://instagram.com/p/test1",
      media_type: "IMAGE",
      timestamp: "2026-03-28T18:00:00Z",
    },
    {
      id: "ig-2",
      caption: "Friday night vibes at Sultan 🎉",
      media_url: "https://instagram.com/test/photo2.jpg",
      permalink: "https://instagram.com/p/test2",
      media_type: "IMAGE",
      timestamp: "2026-03-27T20:00:00Z",
    },
    {
      id: "ig-3",
      caption: "Our famous Lamb Biryani",
      media_url: "https://instagram.com/test/video1.mp4",
      permalink: "https://instagram.com/p/test3",
      media_type: "VIDEO",
      thumbnail_url: "https://instagram.com/test/thumb1.jpg",
      timestamp: "2026-03-26T12:00:00Z",
    },
  ],
  fetchPosts: vi.fn().mockImplementation(async (limit = 6) => {
    return instagramMock.posts.slice(0, limit);
  }),
};

vi.mock("@/lib/services/instagram.service", () => ({
  instagramService: {
    getPosts: instagramMock.fetchPosts,
  },
}));
