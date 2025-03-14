import { google } from 'googleapis';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

// Helper function to extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

interface Comment {
  author: string;
  text: string;
  likeCount: number;
  publishedAt: string;
}

interface YouTubeVideoData {
  videoId: string;
  videoTitle: string;
  comments: Comment[];
}

/**
 * Fetches comments for a YouTube video
 * @param url The YouTube video URL
 * @returns Video data with comments
 */
export async function fetchYouTubeComments(url: string): Promise<YouTubeVideoData> {
  if (!url) {
    throw new Error('YouTube URL is required');
  }
  
  const videoId = extractVideoId(url);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  
  // Get video details
  const videoResponse = await youtube.videos.list({
    part: ['snippet'],
    id: [videoId],
  });
  
  const videoTitle = videoResponse.data.items?.[0]?.snippet?.title || 'Unknown Video';
  
  // Get comments (comment threads)
  const commentResponse = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId: videoId,
    maxResults: 100, // Adjust as needed
  });
  
  const comments = commentResponse.data.items?.map(item => {
    const comment = item.snippet?.topLevelComment?.snippet;
    return {
      author: comment?.authorDisplayName || 'Anonymous',
      text: comment?.textDisplay || '',
      likeCount: comment?.likeCount || 0,
      publishedAt: comment?.publishedAt || '',
    };
  }) || [];
  
  return {
    videoId,
    videoTitle,
    comments,
  };
} 