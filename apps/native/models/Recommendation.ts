import type { Food, NutritionInfo } from './Food';

export interface RecommendationReason {
	type:
		| 'same_ingredients'
		| 'different_ingredients'
		| 'flavor_variation'
		| 'nutritional_balance';
	description: string;
}

export interface Recommendation {
	id: string;
	suggestedFoods: Food[];
	reason: RecommendationReason;
	nutritionalBalance: NutritionInfo;
	timestamp: Date;
	confidence: number; // AI confidence score (0-1)
}
