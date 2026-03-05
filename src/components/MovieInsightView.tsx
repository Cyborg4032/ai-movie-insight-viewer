
'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Clock, User, Film, ThumbsUp, ThumbsDown, MessageSquare, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MovieInsightResponse } from '@/app/actions/movie';

interface MovieInsightViewProps {
  data: MovieInsightResponse;
}

export function MovieInsightView({ data }: MovieInsightViewProps) {
  const { movie, insights } = data;

  const sentimentColor = 
    insights.overallSentiment === 'Positive' ? 'text-green-500 bg-green-500/10' :
    insights.overallSentiment === 'Negative' ? 'text-red-500 bg-red-500/10' :
    'text-yellow-500 bg-yellow-500/10';

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Movie Poster & Basic Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/5 group">
            <Image 
              src={movie.poster} 
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 netflix-gradient opacity-60" />
            <div className="absolute bottom-4 left-4 right-4">
               <div className="flex flex-wrap gap-2">
                 {movie.genres.map(genre => (
                   <Badge key={genre} variant="secondary" className="bg-white/10 backdrop-blur-md border-white/5 text-white">
                     {genre}
                   </Badge>
                 ))}
               </div>
            </div>
          </div>
          
          <Card className="glass-morphism border-none">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xl font-bold">{movie.rating}</span>
                  <span className="text-muted-foreground text-sm">/ 10</span>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {movie.year}
                </Badge>
              </div>
              <Separator className="bg-white/10" />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Film className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Director:</span>
                  <span className="font-medium">{movie.director}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <span className="text-muted-foreground">Cast:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {movie.cast.map(c => <span key={c} className="after:content-[','] last:after:content-[''] mr-1 font-medium">{c}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Insights */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
              {movie.title.toUpperCase()}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-md">
              {movie.plot}
            </p>
          </div>

          <Card className="glass-morphism border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  AI Audience Insight
                </CardTitle>
                <CardDescription>Generated from processed audience reviews</CardDescription>
              </div>
              <Badge className={`px-4 py-1 text-sm font-bold uppercase ${sentimentColor}`}>
                {insights.overallSentiment} Sentiment
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquare className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {insights.sentimentSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-green-500 font-bold uppercase text-xs tracking-widest">
                    <ThumbsUp className="w-4 h-4" />
                    Positive Themes
                  </h4>
                  <ul className="space-y-2">
                    {insights.commonPositiveThemes.map((theme, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-md text-sm group hover:bg-white/10 transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs tracking-widest">
                    <ThumbsDown className="w-4 h-4" />
                    Negative Themes
                  </h4>
                  <ul className="space-y-2">
                    {insights.commonNegativeThemes.map((theme, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-md text-sm group hover:bg-white/10 transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
