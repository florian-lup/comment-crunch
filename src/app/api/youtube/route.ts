import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }
    
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
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
    
    return NextResponse.json({
      videoId,
      videoTitle,
      comments,
    });
    
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube comments' },
      { status: 500 }
    );
  }
} 