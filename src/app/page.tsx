import { CommentAnalyzer } from "@/components/CommentAnalyzer";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header */}
      <Header />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Main content header */}
        <div className="text-center mb-12 mt-6">
          <div className="float-animation">
            <h2 className="text-lg md:text-xl font-medium mb-2 max-w-3xl mx-auto">
              <span className="text-gradient-2">
                Extract key insights from YouTube comments using AI
              </span>
            </h2>
          </div>
          <div className="mt-6 flex justify-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800">
              AI-Powered
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100/80 text-indigo-800">
              YouTube Analysis
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100/80 text-sky-800">
              Instant Insights
            </span>
          </div>
        </div>
        
        {/* Main content */}
        <CommentAnalyzer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
