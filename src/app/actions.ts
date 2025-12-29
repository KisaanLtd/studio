'use server';

import {
  buyerAISuggestedMatches,
  type BuyerAISuggestedMatchesInput,
  type BuyerAISuggestedMatchesOutput,
} from '@/ai/flows/buyer-ai-suggested-matches';

export type MatchResult = BuyerAISuggestedMatchesOutput | null;

export async function findFarmerMatches(
  input: BuyerAISuggestedMatchesInput
): Promise<{ matches: MatchResult; error: string | null }> {
  try {
    const matches = await buyerAISuggestedMatches(input);
    return { matches, error: null };
  } catch (error) {
    console.error('Error finding farmer matches:', error);
    return { matches: null, error: 'An unexpected error occurred while finding matches. Please try again.' };
  }
}
