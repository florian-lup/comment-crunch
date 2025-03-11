import { CommentAnalyzer } from "@/components/CommentAnalyzer";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow notion-container notion-page">
        {/* Main content header */}
        <div className="mb-8 mt-4">
          <h2 className="text-3xl font-medium mb-2">
            Extract insights from YouTube comments
          </h2>
          <p className="text-gray-500">
            Use AI to analyze and summarize YouTube comment sections quickly
          </p>
          <div className="mt-4 flex space-x-2">
            <span className="notion-tag notion-tag-blue">AI-Powered</span>
            <span className="notion-tag notion-tag-purple">YouTube Analysis</span>
            <span className="notion-tag notion-tag-pink">Instant Insights</span>
          </div>
          <div className="notion-divider my-6"></div>
        </div>
        
        {/* Main content */}
        <CommentAnalyzer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
