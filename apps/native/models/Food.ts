export interface NutritionInfo {
	calories?: number;
	protein?: number;
	carbs?: number;
	fat?: number;
	fiber?: number;
	sugar?: number;
}

export interface Food {
	id: string;
	name: string;
	category: 'main' | 'side' | 'soup' | 'rice' | 'dessert' | 'drink' | 'other';
	nutrition?: NutritionInfo;
	confidence: number; // AI confidence score (0-1)
}