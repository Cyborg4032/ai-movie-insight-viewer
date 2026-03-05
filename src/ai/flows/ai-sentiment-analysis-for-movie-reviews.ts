'use server';
/**
 * @fileOverview This file implements a Genkit flow for AI-powered sentiment analysis of movie reviews.
 *
 * - aiSentimentAnalysisForMovieReviews - A function that analyzes movie reviews using an LLM.
 * - AiSentimentAnalysisForMovieReviewsInput - The input type for the aiSentimentAnalysisForMovieReviews function.
 * - AiSentimentAnalysisForMovieReviewsOutput - The return type for the aiSentimentAnalysisForMovieReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSentimentAnalysisForMovieReviewsInputSchema = z.object({
  reviews: z
    .array(z.string())
    .describe('An array of audience reviews for a movie.'),
});
export type AiSentimentAnalysisForMovieReviewsInput = z.infer<
  typeof AiSentimentAnalysisForMovieReviewsInputSchema
>;

const AiSentimentAnalysisForMovieReviewsOutputSchema = z.object({
  sentimentSummary: z
    .string()
    .describe('A comprehensive summary of the overall audience sentiment.'),
  commonPositiveThemes: z
    .array(z.string())
    .describe('A list of common positive themes identified in the reviews.'),
  commonNegativeThemes: z
    .array(z.string())
    .describe('A list of common negative themes identified in the reviews.'),
  overallSentiment: z
    .enum(['Positive', 'Mixed', 'Negative'])
    .describe(
      'The overall sentiment classification of the movie reviews (Positive, Mixed, or Negative).'
    ),
});
export type AiSentimentAnalysisForMovieReviewsOutput = z.infer<
  typeof AiSentimentAnalysisForMovieReviewsOutputSchema
>;

export async function aiSentimentAnalysisForMovieReviews(
  input: AiSentimentAnalysisForMovieReviewsInput
): Promise<AiSentimentAnalysisForMovieReviewsOutput> {
  return aiSentimentAnalysisForMovieReviewsFlow(input);
}

const aiSentimentAnalysisForMovieReviewsPrompt = ai.definePrompt({
  name: 'aiSentimentAnalysisForMovieReviewsPrompt',
  input: {schema: AiSentimentAnalysisForMovieReviewsInputSchema},
  output: {schema: AiSentimentAnalysisForMovieReviewsOutputSchema},
  prompt: `You are an expert movie critic and sentiment analysis AI.
Your task is to analyze a collection of audience reviews for a movie and provide a structured analysis.

Based on the provided reviews, perform the following:
1.  **Comprehensive Sentiment Summary**: Summarize the overall feeling and common reactions expressed by the audience.
2.  **Common Positive Themes**: Identify and list the most recurring positive aspects or elements praised in the reviews.
3.  **Common Negative Themes**: Identify and list the most recurring negative aspects or criticisms found in the reviews.
4.  **Overall Sentiment Classification**: Classify the overall sentiment as 'Positive', 'Mixed', or 'Negative'.

Here are the audience reviews:

{{#each reviews}}
-   {{{this}}}
{{/each}}`,
});

const aiSentimentAnalysisForMovieReviewsFlow = ai.defineFlow(
  {
    name: 'aiSentimentAnalysisForMovieReviewsFlow',
    inputSchema: AiSentimentAnalysisForMovieReviewsInputSchema,
    outputSchema: AiSentimentAnalysisForMovieReviewsOutputSchema,
  },
  async input => {
    const {output} = await aiSentimentAnalysisForMovieReviewsPrompt(input);
    return output!;
  }
);
