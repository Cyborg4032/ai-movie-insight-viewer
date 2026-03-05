
'use server';

import { fetchMovieDetails, fetchMovieReviews, MovieDetails } from "@/lib/movie-service";
import { aiSentimentAnalysisForMovieReviews, AiSentimentAnalysisForMovieReviewsOutput } from "@/ai/flows/ai-sentiment-analysis-for-movie-reviews";

export type MovieInsightResponse = {
  movie: MovieDetails;
  insights: AiSentimentAnalysisForMovieReviewsOutput;
};

export async function getMovieInsights(imdbId: string): Promise<MovieInsightResponse | { error: string }> {
  try {
    // 1. Validate IMDb ID format
    const imdbRegex = /^tt\d{7,8}$/;
    if (!imdbRegex.test(imdbId)) {
      return { error: "Invalid IMDb ID format. It should start with 'tt' followed by 7-8 digits." };
    }

    // 2. Fetch Movie Metadata
    const movie = await fetchMovieDetails(imdbId);
    if (!movie) {
      return { error: "Movie not found. Please check the IMDb ID." };
    }

    // 3. Fetch Reviews
    const reviews = await fetchMovieReviews(imdbId);
    if (!reviews || reviews.length === 0) {
      return { error: "No audience reviews available for this movie." };
    }

    // 4. Call AI Flow for Sentiment Analysis
    const insights = await aiSentimentAnalysisForMovieReviews({ reviews });

    return { movie, insights };
  } catch (error) {
    console.error("Movie insight generation failed:", error);
    return { error: "An unexpected error occurred while analyzing the movie. Please try again." };
  }
}
