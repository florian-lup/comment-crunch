export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        Comment Crunch
      </h1>
      <p className="text-gray-600 mb-8">
        Extract key insights from YouTube comments using AI
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Analyze YouTube Comments</h2>
        <p className="text-gray-500 mb-4">Paste a YouTube video URL to get AI-powered insights from the comments</p>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="https://www.youtube.com/watch?v=..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Analyze Comments
          </button>
        </div>
      </div>
    </div>
  );
}
