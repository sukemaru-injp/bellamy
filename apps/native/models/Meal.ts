import type { Food, NutritionInfo } from './Food';

export interface Meal {
	id: string;
	photoUri: string;
	recognizedFoods: Food[];
	datetime: Date;
	nutrition?: NutritionInfo;
	notes?: string;
	mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
