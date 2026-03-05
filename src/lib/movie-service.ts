
export interface MovieDetails {
  imdbID: string;
  title: string;
  year: string;
  rating: string;
  plot: string;
  poster: string;
  director: string;
  cast: string[];
  genres: string[];
}

const MOCK_REVIEWS = [
  "Absolutely masterpiece. The storytelling is peerless and the acting is top-notch.",
  "I was bored halfway through. It felt way too long for such a simple premise.",
  "Visually stunning, though the plot was a bit thin in parts. Still worth a watch!",
  "A defining moment in cinema. Every shot is like a painting.",
  "The ending was confusing and didn't really resolve anything.",
  "Best movie of the year! I've seen it three times already.",
  "The lead actor was incredible, but the supporting cast was lacking.",
  "Generic action flick. Nothing new here, just more explosions and bad dialogue.",
  "A touching story that stayed with me for days. Highly recommended.",
  "Avoid this at all costs. A total waste of time and money.",
  "Great music and atmosphere, but the pacing was sluggish.",
  "An instant classic that perfectly captures the human condition.",
  "The special effects were outdated even for its time.",
  "I didn't expect to like it, but I was pleasantly surprised by the depth.",
  "Pure entertainment from start to finish. Don't think too hard, just enjoy."
];

export async function fetchMovieDetails(imdbId: string): Promise<MovieDetails | null> {
  // Simulating an API call to a movie database
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const popularMovies: Record<string, Partial<MovieDetails>> = {
    "tt0111161": {
      title: "The Shawshank Redemption",
      year: "1994",
      rating: "9.3",
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      genres: ["Drama"],
      plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    "tt0468569": {
      title: "The Dark Knight",
      year: "2008",
      rating: "9.0",
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      genres: ["Action", "Crime", "Drama"],
      plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    "tt0137523": {
      title: "Fight Club",
      year: "1999",
      rating: "8.8",
      director: "David Fincher",
      cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
      genres: ["Drama"],
      plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
    }
  };

  const movieData = popularMovies[imdbId] || {
    title: "Generic Cinematic Experience",
    year: "2023",
    rating: "7.5",
    director: "A. Director",
    cast: ["Actor One", "Actor Two", "Actor Three"],
    genres: ["Thriller", "Mystery"],
    plot: "A mysterious stranger arrives in a small town and disrupts the peace with a secret from their past."
  };

  return {
    imdbID: imdbId,
    poster: `https://picsum.photos/seed/${imdbId}/600/900`,
    director: movieData.director!,
    cast: movieData.cast!,
    genres: movieData.genres!,
    ...movieData
  } as MovieDetails;
}

export async function fetchMovieReviews(imdbId: string): Promise<string[]> {
  // In a real app, this would fetch from a Reviews API
  // We return a shuffled subset of our mock reviews
  return [...MOCK_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 15);
}
