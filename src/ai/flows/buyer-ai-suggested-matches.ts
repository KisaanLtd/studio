'use server';
/**
 * @fileOverview An AI-powered matching flow for buyers to discover available farmers.
 *
 * - buyerAISuggestedMatches - A function that returns a list of suggested farmers based on buyer requirements.
 * - BuyerAISuggestedMatchesInput - The input type for the buyerAISuggestedMatches function.
 * - BuyerAISuggestedMatchesOutput - The return type for the buyerAISuggestedMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BuyerAISuggestedMatchesInputSchema = z.object({
  cropType: z.string().describe('The type of crop the buyer is looking for.'),
  location: z.string().describe('The location where the buyer needs the crop.'),
  quantity: z.string().describe('The quantity of the crop required by the buyer.'),
  timing: z.string().describe('The desired harvest dates or timing for the crop.'),
  organicCertification: z
    .boolean()
    .describe('Whether the buyer requires organic certification.'),
});
export type BuyerAISuggestedMatchesInput = z.infer<
  typeof BuyerAISuggestedMatchesInputSchema
>;

const BuyerAISuggestedMatchesOutputSchema = z.array(z.object({
  farmerName: z.string().describe('The name of the farmer.'),
  farmerLocation: z.string().describe('The location of the farmer.'),
  matchScore: z.number().describe('A score from 0 to 100 indicating the quality of the match.'),
}));
export type BuyerAISuggestedMatchesOutput = z.infer<
  typeof BuyerAISuggestedMatchesOutputSchema
>;

export async function buyerAISuggestedMatches(
  input: BuyerAISuggestedMatchesInput
): Promise<BuyerAISuggestedMatchesOutput> {
  return buyerAISuggestedMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'buyerAISuggestedMatchesPrompt',
  input: {schema: BuyerAISuggestedMatchesInputSchema},
  output: {schema: BuyerAISuggestedMatchesOutputSchema},
  prompt: `You are an AI assistant helping buyers discover potential farmer matches.

  Based on the buyer's requirements, suggest a list of farmers that meet those needs.
  Provide the farmer's name, location, and a match score from 0 to 100.
  The match score indicates the quality of the fit based on the provided criteria.

  Buyer Requirements:
  - Crop Type: {{{cropType}}}
  - Location: {{{location}}}
  - Quantity: {{{quantity}}}
  - Timing: {{{timing}}}
  - Organic Certification: {{#if organicCertification}}Required{{else}}Not Required{{/if}}

  Format your response as a JSON array of farmer objects with the following fields:
  - farmerName (string): The name of the farmer.
  - farmerLocation (string): The location of the farmer.
  - matchScore (number): A score from 0 to 100 indicating the quality of the match.
  `,
});

const buyerAISuggestedMatchesFlow = ai.defineFlow(
  {
    name: 'buyerAISuggestedMatchesFlow',
    inputSchema: BuyerAISuggestedMatchesInputSchema,
    outputSchema: BuyerAISuggestedMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
