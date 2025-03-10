import { CommentAnalyzer } from "@/components/CommentAnalyzer";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            Comment Crunch
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Extract key insights from YouTube comments using AI
          </p>
        </div>
        
        {/* Main content */}
        <CommentAnalyzer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
