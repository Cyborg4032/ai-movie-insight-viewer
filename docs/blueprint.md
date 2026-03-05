# **App Name**: AI Movie Insight Builder

## Core Features:

- IMDb ID Input & Validation: Allows users to input an IMDb Movie ID with client-side validation to ensure correct format (e.g., 'tt' prefix, numeric).
- Movie Data Retrieval: Fetches essential movie details, including title, poster, cast, release year, IMDb rating, and plot summary, from external movie APIs.
- Audience Review Collection: Gathers a selection of 10-30 audience reviews from public movie review APIs or datasets for sentiment analysis.
- AI Audience Sentiment Analysis: Processes collected audience reviews using a Large Language Model (LLM) as a tool to generate a comprehensive sentiment summary, identify common positive and negative themes, and classify the overall sentiment (Positive, Mixed, or Negative).
- Dynamic Movie Insight Display: Presents all retrieved movie details alongside the AI-generated sentiment analysis and insights in a clear, organized, and interactive user interface.
- Adaptive UI with Loaders: Provides a responsive, modern user interface utilizing card-based layouts, smooth animations via Framer Motion, and skeleton loaders to indicate data fetching.
- Comprehensive Error Feedback: Handles various error conditions, such as invalid IMDb IDs, movie not found, API failures, or unavailable reviews, displaying user-friendly error messages.

## Style Guidelines:

- Background color: Very dark charcoal-black (#141414) for a cinematic, immersive feel, reminiscent of streaming dashboards.
- Primary accent color: Classic Netflix red (#E50914) for interactive elements, highlights, and branding, ensuring high visibility and energy.
- Text color: Off-white or light grey (#E0E0E0) for optimal readability against the dark background.
- A clean, modern sans-serif font like 'Roboto' for all text, ensuring consistency and readability across various elements and devices, similar to popular streaming platforms.
- Minimalist, clean, and filled glyph icons, aligning with a modern dashboard aesthetic for clear and intuitive navigation.
- A responsive, card-based layout structured to efficiently display movie information and AI insights across desktop, tablet, and mobile devices. Emphasize large, immersive movie poster displays within the cards, similar to Netflix's browsing experience. Glassmorphism can be selectively applied for a modern depth effect on certain UI elements.
- Smooth, subtle transitions and micro-interactions powered by Framer Motion, enhancing user engagement and feedback. Features include elegant loading animations and skeleton loaders to improve the perceived performance during data retrieval, contributing to a fluid user experience.