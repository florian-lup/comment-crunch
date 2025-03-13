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
      `Author: ${comment.author}\nComment: ${comment.text}`
    ).join('\n\n');
    
    // Prepare the prompt for Gemini
    const prompt = `
    You are an expert YouTube content analyst tasked with analyzing comments from the YouTube video titled: "${videoTitle}".
    
    Here are the comments:
    
    ${commentsText}
    
    Please provide a comprehensive analysis of these comments with the following structure:
        
    ## Overall Sentiment Analysis
    (2-3 paragraphs describing the general sentiment. Classify the overall sentiment as primarily positive, negative, mixed, or neutral. Include approximate percentages if possible. Identify the main themes and topics discussed.)
    
    ## Audience Engagement Overview
    - Estimate the level of engagement (high, medium, low)
    - Identify any patterns in how viewers are engaging with the content
    
    ## Key Positive Feedback (3-5 most significant points)
    
    - **"Direct quote from a commenter"** - @username
      
      *Provide analysis explaining why this feedback is valuable and how it relates to the video's content*
    
    ## Areas for Improvement (3-5 most constructive criticisms)
    
    - **"Direct quote highlighting criticism"** - @username
      
      *Analyze what this criticism suggests about potential improvements for future content*
    
    ## Interesting Insights & Questions (3-5 most thought-provoking points)
    
    - **"Quote showing an interesting perspective"** - @username
      
      *Explain why this insight matters and how it might inform future content strategy*
    
    ## Content Opportunities
    (1-2 paragraphs suggesting potential content ideas or topics that viewers seem interested in, based on their comments)
    
    ## Summary
    (A brief concluding paragraph that summarizes the overall analysis and key takeaways)

    ---
    
    Format your response in clean, well-structured Markdown using proper heading levels and emphasis for important points. For the comment quotes sections, maintain the format with dashes: "- **"quote"** - @username" followed by the analysis in italics.
    `;
    
    // Get the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash" // Using Gemini 2.0 Flash
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