'use client';

import React, { useState } from 'react';
import { Search, Film, AlertCircle, Info } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getMovieInsights, MovieInsightResponse } from "@/app/actions/movie";
import { MovieInsightView } from "@/components/MovieInsightView";
import { MovieLoading } from "@/components/MovieLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [imdbId, setImdbId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MovieInsightResponse | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!imdbId.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter an IMDb ID (e.g., tt0111161)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    const response = await getMovieInsights(imdbId.trim());

    setLoading(false);
    if ('error' in response) {
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    } else {
      setResult(response);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header / Search Hero Section */}
      <section className={`w-full text-center transition-all duration-700 ${result ? 'mt-0 mb-12' : 'mt-20 mb-20'}`}>
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="bg-primary/20 p-4 rounded-full ring-4 ring-primary/10 mb-2">
            <Film className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-md">
            MOVIE <span className="text-primary">INSIGHT</span> BUILDER
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Harness the power of AI to analyze audience sentiment. Simply enter an IMDb ID to unlock deep thematic insights and review summaries.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Enter IMDb ID (e.g., tt0111161)" 
              value={imdbId}
              onChange={(e) => setImdbId(e.target.value)}
              className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-all text-lg"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="h-12 px-8 font-bold text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Generate Insights"}
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
           <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Try popular IDs:</span>
           {['tt0111161', 'tt0468569', 'tt0137523'].map(id => (
             <button 
               key={id}
               onClick={() => { setImdbId(id); }}
               className="text-xs text-primary hover:underline font-mono"
             >
               {id}
             </button>
           ))}
        </div>
      </section>

      {/* Content Area */}
      <section className="w-full">
        {loading && <MovieLoading />}
        
        {result && <MovieInsightView data={result} />}

        {!result && !loading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center max-w-md">
               <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
               <p className="text-xl font-medium">Ready to analyze</p>
               <p className="text-sm mt-2">Enter a movie ID above to see the magic happen.</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer Branding */}
      <footer className="mt-20 py-8 border-t border-white/5 w-full text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI Movie Insight Builder.
        </p>
      </footer>
    </main>
  );
}
