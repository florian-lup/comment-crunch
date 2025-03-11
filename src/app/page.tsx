import { CommentAnalyzer } from "@/components/CommentAnalyzer";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header */}
        <Header className="w-full max-w-4xl" />
        
        {/* Main content */}
        <CommentAnalyzer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
