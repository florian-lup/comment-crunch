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
    
    - **"Direct quote from a commenter"** - @username
      
      *Add your brief analysis here explaining the significance of this comment*
    
    - **"Another positive quote"** - @username
      
      *Add your brief analysis here*
    
    - **"Another positive quote"** - @username
      
      *Add your brief analysis here*
    
    ## Criticism
    
    - **"Direct quote highlighting criticism"** - @username
      
      *Add your brief analysis here explaining what this criticism means*
    
    - **"Another negative quote"** - @username
      
      *Add your brief analysis here*
    
    - **"Another negative quote"** - @username
      
      *Add your brief analysis here*
    
    ## Interesting Insights or Questions Raised
    
    - **"Quote showing an interesting perspective"** - @username
      
      *Add your brief analysis here explaining why this insight is interesting*
    
    - **"Another interesting quote or question"** - @username
      
      *Add your brief analysis here*
    
    Format the response in clean, well-structured Markdown using proper heading levels, bullet points, and emphasis for quotes and usernames.
    
    Formatting guidelines:
    1. Use ## for main section headings
    2. Use bold (**text**) for direct quotes and usernames
    3. Use @username format for usernames
    4. Use italics (*text*) for your analysis of each quote
    5. Make sure to add a blank line between the quote and your analysis
    6. Make sure to include the most insightful and representative comments
    7. For each quote, add a brief analysis in italics that explains the significance of the comment
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