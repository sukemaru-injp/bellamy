import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { colors } from '@/styles/foundation';
import Feather from '@expo/vector-icons/Feather';
import type { Recommendation, Food } from '@/models';

export default function RecommendationsScreen() {
	const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedFilter, setSelectedFilter] = useState<'all' | 'same_ingredients' | 'different_ingredients' | 'flavor_variation' | 'nutritional_balance'>('all');

	useEffect(() => {
		loadRecommendations();
	}, []);

	const loadRecommendations = async () => {
		setIsLoading(true);
		
		// Mock recommendations - replace with actual API call
		setTimeout(() => {
			const mockRecommendations: Recommendation[] = [
				{
					id: '1',
					suggestedFoods: [
						{ id: '1', name: 'チキンテリヤキ', category: 'main', confidence: 0.9 },
						{ id: '2', name: '白米', category: 'rice', confidence: 0.95 },
						{ id: '3', name: '味噌汁', category: 'soup', confidence: 0.8 }
					],
					reason: {
						type: 'same_ingredients',
						description: '先週よく食べていた鶏肉を使った料理です'
					},
					nutritionalBalance: {
						calories: 650,
						protein: 35,
						carbs: 48,
						fat: 20
					},
					timestamp: new Date(),
					confidence: 0.85
				},
				{
					id: '2',
					suggestedFoods: [
						{ id: '4', name: '鮭の塩焼き', category: 'main', confidence: 0.9 },
						{ id: '5', name: '野菜炒め', category: 'side', confidence: 0.8 },
						{ id: '6', name: '玄米', category: 'rice', confidence: 0.9 }
					],
					reason: {
						type: 'different_ingredients',
						description: '魚料理をあまり食べていないので、栄養バランスを考えました'
					},
					nutritionalBalance: {
						calories: 520,
						protein: 30,
						carbs: 45,
						fat: 15
					},
					timestamp: new Date(),
					confidence: 0.78
				},
				{
					id: '3',
					suggestedFoods: [
						{ id: '7', name: 'ハンバーグ', category: 'main', confidence: 0.9 },
						{ id: '8', name: 'ポテトサラダ', category: 'side', confidence: 0.8 },
						{ id: '9', name: 'コーンスープ', category: 'soup', confidence: 0.85 }
					],
					reason: {
						type: 'flavor_variation',
						description: 'いつもの味付けと違う洋風メニューはいかがですか？'
					},
					nutritionalBalance: {
						calories: 720,
						protein: 28,
						carbs: 52,
						fat: 35
					},
					timestamp: new Date(),
					confidence: 0.82
				}
			];
			setRecommendations(mockRecommendations);
			setIsLoading(false);
		}, 1000);
	};

	const getFilteredRecommendations = () => {
		if (selectedFilter === 'all') {
			return recommendations;
		}
		return recommendations.filter(rec => rec.reason.type === selectedFilter);
	};

	const getReasonIcon = (type: Recommendation['reason']['type']) => {
		switch (type) {
			case 'same_ingredients':
				return 'repeat';
			case 'different_ingredients':
				return 'shuffle';
			case 'flavor_variation':
				return 'star';
			case 'nutritional_balance':
				return 'activity';
			default:
				return 'lightbulb';
		}
	};

	const getReasonColor = (type: Recommendation['reason']['type']) => {
		switch (type) {
			case 'same_ingredients':
				return colors.recommendation.sameIngredients;
			case 'different_ingredients':
				return colors.recommendation.differentIngredients;
			case 'flavor_variation':
				return colors.recommendation.flavorVariation;
			case 'nutritional_balance':
				return colors.recommendation.nutritionalBalance;
			default:
				return colors.main;
		}
	};

	const getCategoryColor = (category: Food['category']) => {
		return colors.foodCategory[category] || colors.foodCategory.other;
	};

	const filters = [
		{ key: 'all', label: 'すべて' },
		{ key: 'same_ingredients', label: '同じ食材' },
		{ key: 'different_ingredients', label: '違う食材' },
		{ key: 'flavor_variation', label: '味付け' },
		{ key: 'nutritional_balance', label: '栄養バランス' }
	] as const;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>おすすめメニュー</Text>
				<TouchableOpacity onPress={loadRecommendations}>
					<Feather name="refresh-cw" size={24} color={colors.main} />
				</TouchableOpacity>
			</View>

			<ScrollView 
				horizontal 
				showsHorizontalScrollIndicator={false}
				style={styles.filterContainer}
				contentContainerStyle={styles.filterContent}
			>
				{filters.map((filter) => (
					<TouchableOpacity
						key={filter.key}
						style={[
							styles.filterButton,
							selectedFilter === filter.key && styles.filterButtonActive
						]}
						onPress={() => setSelectedFilter(filter.key)}
					>
						<Text style={[
							styles.filterText,
							selectedFilter === filter.key && styles.filterTextActive
						]}>
							{filter.label}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			<ScrollView
				style={styles.content}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={loadRecommendations} />
				}
			>
				{isLoading ? (
					<View style={styles.loadingContainer}>
						<Text style={styles.loadingText}>おすすめを生成中...</Text>
					</View>
				) : (
					getFilteredRecommendations().map((recommendation) => (
						<View key={recommendation.id} style={styles.recommendationCard}>
							<View style={styles.recommendationHeader}>
								<View style={styles.reasonContainer}>
									<View style={[
										styles.reasonIcon,
										{ backgroundColor: getReasonColor(recommendation.reason.type) }
									]}>
										<Feather 
											name={getReasonIcon(recommendation.reason.type) as any} 
											size={16} 
											color="white" 
										/>
									</View>
									<Text style={styles.reasonText}>{recommendation.reason.description}</Text>
								</View>
								<Text style={styles.confidence}>
									{Math.round(recommendation.confidence * 100)}%
								</Text>
							</View>

							<View style={styles.foodsContainer}>
								{recommendation.suggestedFoods.map((food) => (
									<View key={food.id} style={styles.foodItem}>
										<View style={[
											styles.categoryIndicator,
											{ backgroundColor: getCategoryColor(food.category) }
										]} />
										<Text style={styles.foodName}>{food.name}</Text>
									</View>
								))}
							</View>

							<View style={styles.nutritionContainer}>
								<View style={styles.nutritionItem}>
									<Text style={styles.nutritionLabel}>カロリー</Text>
									<Text style={styles.nutritionValue}>
										{recommendation.nutritionalBalance.calories}kcal
									</Text>
								</View>
								<View style={styles.nutritionItem}>
									<Text style={styles.nutritionLabel}>たんぱく質</Text>
									<Text style={styles.nutritionValue}>
										{recommendation.nutritionalBalance.protein}g
									</Text>
								</View>
								<View style={styles.nutritionItem}>
									<Text style={styles.nutritionLabel}>炭水化物</Text>
									<Text style={styles.nutritionValue}>
										{recommendation.nutritionalBalance.carbs}g
									</Text>
								</View>
								<View style={styles.nutritionItem}>
									<Text style={styles.nutritionLabel}>脂質</Text>
									<Text style={styles.nutritionValue}>
										{recommendation.nutritionalBalance.fat}g
									</Text>
								</View>
							</View>

							<TouchableOpacity style={styles.actionButton}>
								<Text style={styles.actionButtonText}>この組み合わせを保存</Text>
							</TouchableOpacity>
						</View>
					))
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
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.main,
	},
	filterContainer: {
		maxHeight: 60,
	},
	filterContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	filterButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.main,
		backgroundColor: 'white',
		marginRight: 8,
	},
	filterButtonActive: {
		backgroundColor: colors.main,
	},
	filterText: {
		color: colors.main,
		fontSize: 14,
		fontWeight: 'bold',
	},
	filterTextActive: {
		color: 'white',
	},
	content: {
		flex: 1,
	},
	loadingContainer: {
		padding: 32,
		alignItems: 'center',
	},
	loadingText: {
		fontSize: 16,
		color: colors.text.secondary,
	},
	recommendationCard: {
		backgroundColor: 'white',
		margin: 16,
		borderRadius: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	recommendationHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	reasonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	reasonIcon: {
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	reasonText: {
		flex: 1,
		fontSize: 14,
		color: colors.text.secondary,
	},
	confidence: {
		fontSize: 12,
		color: colors.text.muted,
		fontWeight: 'bold',
	},
	foodsContainer: {
		marginBottom: 16,
	},
	foodItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
	},
	categoryIndicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 12,
	},
	foodName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.text.primary,
	},
	nutritionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#f8f9fa',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	nutritionItem: {
		alignItems: 'center',
	},
	nutritionLabel: {
		fontSize: 10,
		color: colors.text.secondary,
		marginBottom: 2,
	},
	nutritionValue: {
		fontSize: 12,
		fontWeight: 'bold',
		color: colors.main,
	},
	actionButton: {
		backgroundColor: colors.main,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	actionButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});