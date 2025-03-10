import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    
    // Prepare the prompt for GPT-4o
    const prompt = `
    You are analyzing comments from the YouTube video titled: "${videoTitle}".
    
    Here are the comments:
    
    ${commentsText}
    
    Please provide a concise summary of these comments with the following structure:
    
    # Comment Analysis for "${videoTitle}"
    
    ## Overall Sentiment and Themes
    (2-3 paragraphs about the general sentiment and main themes in the comments)
    
    ## Key Positive Points
    - **"Direct quote from a commenter"** - @username (Add your brief analysis if relevant)
    - **"Another positive quote"** - @username
    - **"Another positive quote"** - @username
    
    ## Key Negative Points or Criticisms
    - **"Direct quote highlighting criticism"** - @username (Add your brief analysis if relevant)
    - **"Another negative quote"** - @username
    - **"Another negative quote"** - @username
    
    ## Interesting Insights or Questions Raised
    - **"Quote showing an interesting perspective"** - @username
    - **"Another interesting quote or question"** - @username
    
    Format the response in clean, well-structured Markdown using proper heading levels, bullet points, and emphasis for quotes and usernames.
    Use bold for direct quotes and include the username of each commenter after their quote.
    `;
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that analyzes YouTube comments and provides insightful summaries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });
    
    const analysis = response.choices[0]?.message?.content || "No analysis available";
    
    return NextResponse.json({ analysis });
    
  } catch (error) {
    console.error('Error analyzing comments:', error);
    return NextResponse.json(
      { error: 'Failed to analyze comments' },
      { status: 500 }
    );
  }
} 