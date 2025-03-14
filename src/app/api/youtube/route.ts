import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeComments } from '@/services/youtube';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }
    
    const videoData = await fetchYouTubeComments(url);
    
    return NextResponse.json(videoData);
    
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch YouTube comments' },
      { status: 500 }
    );
  }
} 