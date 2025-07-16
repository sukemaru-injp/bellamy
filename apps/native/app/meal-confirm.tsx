import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/styles/foundation';
import Feather from '@expo/vector-icons/Feather';
import type { Food, Meal } from '@/models';

export default function MealConfirmScreen() {
	const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
	const router = useRouter();
	const [recognizedFoods, setRecognizedFoods] = useState<Food[]>([]);
	const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
	const [notes, setNotes] = useState('');
	const [isAnalyzing, setIsAnalyzing] = useState(true);

	useEffect(() => {
		if (photoUri) {
			analyzePhoto();
		}
	}, [photoUri]);

	const analyzePhoto = async () => {
		setIsAnalyzing(true);
		
		// Mock AI analysis - replace with actual Gemini API call
		setTimeout(() => {
			const mockFoods: Food[] = [
				{
					id: '1',
					name: 'チキンカレー',
					category: 'main',
					confidence: 0.9,
					nutrition: {
						calories: 450,
						protein: 25,
						carbs: 45,
						fat: 18
					}
				},
				{
					id: '2',
					name: '白米',
					category: 'rice',
					confidence: 0.95,
					nutrition: {
						calories: 200,
						protein: 4,
						carbs: 45,
						fat: 0.5
					}
				},
				{
					id: '3',
					name: 'サラダ',
					category: 'side',
					confidence: 0.8,
					nutrition: {
						calories: 50,
						protein: 2,
						carbs: 8,
						fat: 2
					}
				}
			];
			setRecognizedFoods(mockFoods);
			setIsAnalyzing(false);
		}, 2000);
	};

	const updateFoodName = (foodId: string, newName: string) => {
		setRecognizedFoods(prev => 
			prev.map(food => 
				food.id === foodId ? { ...food, name: newName } : food
			)
		);
	};

	const removeFood = (foodId: string) => {
		setRecognizedFoods(prev => prev.filter(food => food.id !== foodId));
	};

	const addFood = () => {
		const newFood: Food = {
			id: Date.now().toString(),
			name: '',
			category: 'other',
			confidence: 1.0
		};
		setRecognizedFoods(prev => [...prev, newFood]);
	};

	const saveMeal = () => {
		if (!photoUri || recognizedFoods.length === 0) {
			Alert.alert('エラー', '食べ物が認識されていません');
			return;
		}

		const meal: Meal = {
			id: Date.now().toString(),
			photoUri: decodeURIComponent(photoUri),
			recognizedFoods,
			datetime: new Date(),
			mealType,
			notes: notes.trim() || undefined
		};

		// Save meal logic here (integrate with Convex later)
		console.log('Saving meal:', meal);
		
		Alert.alert('保存完了', '食事が保存されました', [
			{ text: 'OK', onPress: () => router.back() }
		]);
	};

	const getCategoryColor = (category: Food['category']) => {
		return colors.foodCategory[category] || colors.foodCategory.other;
	};

	if (!photoUri) {
		return (
			<View style={styles.container}>
				<Text>写真が見つかりません</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="x" size={24} color={colors.main} />
				</TouchableOpacity>
				<Text style={styles.title}>食事を確認</Text>
				<TouchableOpacity onPress={saveMeal} disabled={isAnalyzing}>
					<Text style={[styles.saveButton, isAnalyzing && styles.disabled]}>保存</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content}>
				<Image source={{ uri: decodeURIComponent(photoUri) }} style={styles.photo} />

				{isAnalyzing ? (
					<View style={styles.analyzingContainer}>
						<Text style={styles.analyzingText}>AI が食事を分析中...</Text>
					</View>
				) : (
					<>
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>認識された食べ物</Text>
							{recognizedFoods.map((food, index) => (
								<View key={food.id} style={styles.foodItem}>
									<View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(food.category) }]} />
									<TextInput
										style={styles.foodNameInput}
										value={food.name}
										onChangeText={(text) => updateFoodName(food.id, text)}
										placeholder="食べ物名"
									/>
									<Text style={styles.confidence}>{Math.round(food.confidence * 100)}%</Text>
									<TouchableOpacity onPress={() => removeFood(food.id)}>
										<Feather name="trash-2" size={20} color="#ff6b6b" />
									</TouchableOpacity>
								</View>
							))}
							<TouchableOpacity style={styles.addButton} onPress={addFood}>
								<Feather name="plus" size={20} color={colors.main} />
								<Text style={styles.addButtonText}>食べ物を追加</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>食事タイプ</Text>
							<View style={styles.mealTypeContainer}>
								{(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
									<TouchableOpacity
										key={type}
										style={[
											styles.mealTypeButton,
											mealType === type && styles.mealTypeButtonActive
										]}
										onPress={() => setMealType(type)}
									>
										<Text style={[
											styles.mealTypeText,
											mealType === type && styles.mealTypeTextActive
										]}>
											{type === 'breakfast' ? '朝食' : 
											 type === 'lunch' ? '昼食' :
											 type === 'dinner' ? '夕食' : 'おやつ'}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>メモ</Text>
							<TextInput
								style={styles.notesInput}
								value={notes}
								onChangeText={setNotes}
								placeholder="メモを入力（任意）"
								multiline
								numberOfLines={3}
							/>
						</View>
					</>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.main,
	},
	saveButton: {
		color: colors.main,
		fontWeight: 'bold',
		fontSize: 16,
	},
	disabled: {
		opacity: 0.5,
	},
	content: {
		flex: 1,
	},
	photo: {
		width: '100%',
		height: 250,
		resizeMode: 'cover',
	},
	analyzingContainer: {
		padding: 32,
		alignItems: 'center',
	},
	analyzingText: {
		fontSize: 16,
		color: colors.text.secondary,
	},
	section: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 12,
		color: colors.main,
	},
	foodItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	categoryIndicator: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 12,
	},
	foodNameInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginRight: 12,
	},
	confidence: {
		fontSize: 12,
		color: colors.text.secondary,
		marginRight: 12,
		minWidth: 40,
		textAlign: 'right',
	},
	addButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		borderWidth: 1,
		borderColor: colors.main,
		borderRadius: 8,
		borderStyle: 'dashed',
		marginTop: 12,
	},
	addButtonText: {
		marginLeft: 8,
		color: colors.main,
		fontWeight: 'bold',
	},
	mealTypeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	mealTypeButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.main,
		backgroundColor: 'white',
	},
	mealTypeButtonActive: {
		backgroundColor: colors.main,
	},
	mealTypeText: {
		color: colors.main,
		fontWeight: 'bold',
	},
	mealTypeTextActive: {
		color: 'white',
	},
	notesInput: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		minHeight: 80,
		textAlignVertical: 'top',
	},
});