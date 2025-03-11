import { CommentAnalyzer } from "@/components/CommentAnalyzer";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow container mx-auto">
        {/* Header */}
        <Header className="w-[868px] mx-auto" />
        
        {/* Main content */}
        <CommentAnalyzer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
