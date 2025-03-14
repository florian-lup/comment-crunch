import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the LLM provider from environment variables
    const llmProvider = (process.env.PREFERRED_LLM_PROVIDER || 'openai').toLowerCase();
    
    // Clone the request for forwarding
    const requestData = await request.json();
    
    // Forward the request to the appropriate LLM provider
    let response;
    if (llmProvider === 'gemini') {
      response = await fetch(new URL('/api/gemini', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    } else {
      // Default to OpenAI
      response = await fetch(new URL('/api/openai', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    }
    
    // Return the response from the LLM provider
    const responseData = await response.json();
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('Error in LLM router:', error);
    return NextResponse.json(
      { error: 'Failed to analyze comments' },
      { status: 500 }
    );
  }
} 