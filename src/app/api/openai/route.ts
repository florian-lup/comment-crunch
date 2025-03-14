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
    You are an expert YouTube content analyst tasked with analyzing comments from the YouTube video titled: "${videoTitle}".
    
    Here are the comments:
    
    ${commentsText}
    
    Please provide a comprehensive analysis of these comments with the following structure and markdown formatting:
        
    ## Overall Sentiment Analysis
    (Write 1-2 paragraphs describing the general sentiment. Classify the overall sentiment as primarily **positive**, **negative**, **mixed**, or **neutral**. Include approximate percentages if possible. Identify the main themes and topics discussed.)
    
    ## Audience Engagement Overview
    - Level of engagement (high, medium, low)
    - Key patterns in viewer engagement
    
    ## Key Positive Feedback (2-3 comments)
    
    > **Direct quote from a commenter** - **@username** - *Analysis explaining why this feedback is valuable*
    
    ## Areas for Improvement (2-3 comments)
    
    > **Direct quote highlighting criticism** - **@username** - *Analysis of what this criticism suggests about potential improvements*
    
    ## Questions or requests from viewers (2-3 comments) 
    
    > **Question or request from a viewer** - **@username** - *Analysis of what this question or request suggests about potential improvements*
        
    ## Content Opportunities
    - 2-3 suggestions with bullet points
    
    ## Summary
    (A brief concluding paragraph that summarizes the overall analysis and key takeaways)
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