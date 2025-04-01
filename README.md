# Comment Crunch

Comment Crunch is a web application that analyzes YouTube comments using AI to extract key insights, sentiment, and trends. The application uses the YouTube API to fetch comments and Google's Gemini models to provide a comprehensive analysis.

## Features

- Fetch comments from any YouTube video by URL
- Extract and analyze comment sentiment and themes
- Highlight positive and negative comments with direct quotes
- Identify interesting insights and questions from viewers
- Clean, modern UI with responsive design
- Powered by Google's Gemini AI models

## Prerequisites

- Node.js 18+ and npm
- YouTube Data API key
- Google AI API key with access to Gemini models

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/comment-crunch.git
cd comment-crunch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with your API keys:

```
# Required API Keys
YOUTUBE_API_KEY=your_youtube_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

You can use the `.env.local.example` file as a template.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1. Enter a YouTube video URL in the input field
2. Click "Analyze" to process the comments
3. Wait for the analysis to complete
4. Review the generated insights, which include:
   - Overall sentiment and themes
   - Key positive points with quotes
   - Key negative points with quotes
   - Interesting insights or questions
   - Recommendations based on the comments

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- YouTube Data API
- Google Generative AI API (Gemini models)
- Tailwind CSS

## License

This project is licensed under the MIT License.

## Acknowledgements

- Built with Next.js
- Powered by Google's Gemini models
- YouTube Data API for comment retrieval
