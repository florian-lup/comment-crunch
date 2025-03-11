import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { comments, videoTitle } = await request.json();
    
    if (!comments || !Array.isArray(comments) || comments.length === 0) {
      return NextResponse.json(
        { error: 'Valid comments array is required' },
        { status: 400 }
      );
    }
    
    // Format comments for analysis
    const commentsText = comments.map(comment => 
      `Author: ${comment.author}\nLikes: ${comment.likeCount}\nComment: ${comment.text}`
    ).join('\n\n');
    
    // Prepare the prompt for Gemini
    const prompt = `
    You are analyzing comments from the YouTube video titled: "${videoTitle}".
    
    Here are the comments:
    
    ${commentsText}
    
    Please provide a concise summary of these comments with the following structure:
        
    ## Overall Sentiment
    (2-3 paragraphs about the general sentiment and main themes in the comments)
    
    ## Key Positive Points
    - **"Direct quote from a commenter"** - @username (Add your brief analysis if relevant)
    - **"Another positive quote"** - @username
    - **"Another positive quote"** - @username
    
    ## Criticism
    - **"Direct quote highlighting criticism"** - @username (Add your brief analysis if relevant)
    - **"Another negative quote"** - @username
    - **"Another negative quote"** - @username
    
    ## Interesting Insights or Questions Raised
    - **"Quote showing an interesting perspective"** - @username
    - **"Another interesting quote or question"** - @username
    
    Format the response in clean, well-structured Markdown using proper heading levels, bullet points, and emphasis for quotes and usernames.
    Use bold for direct quotes and include the username of each commenter after their quote.
    `;
    
    // Get the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash" // Using Gemini 1.5 Flash
    });
    
    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();
    
    return NextResponse.json({ analysis });
    
  } catch (error) {
    console.error('Error analyzing comments with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to analyze comments' },
      { status: 500 }
    );
  }
} 