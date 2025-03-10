import { CommentAnalyzer } from '@/components/CommentAnalyzer';

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex justify-center">
      <main className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Comment Crunch
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Extract key insights from YouTube comments using AI
        </p>
        
        <CommentAnalyzer />
      </main>
    </div>
  );
}
