import type { JSX } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/foundation';
import Feather from '@expo/vector-icons/Feather';
import type { Meal } from '@/models';

export const Home = (): JSX.Element => {
	const router = useRouter();

	// Mock data - replace with actual data from store/API
	const recentMeals: Meal[] = [
		{
			id: '1',
			photoUri: 'https://via.placeholder.com/150',
			recognizedFoods: [
				{ id: '1', name: 'チキンカレー', category: 'main', confidence: 0.9 },
				{ id: '2', name: '白米', category: 'rice', confidence: 0.95 }
			],
			datetime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
			mealType: 'lunch'
		},
		{
			id: '2',
			photoUri: 'https://via.placeholder.com/150',
			recognizedFoods: [
				{ id: '3', name: '焼き鮭', category: 'main', confidence: 0.88 },
				{ id: '4', name: '味噌汁', category: 'soup', confidence: 0.92 }
			],
			datetime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
			mealType: 'dinner'
		}
	];

	const todayMealsCount = recentMeals.filter(meal => 
		meal.datetime.toDateString() === new Date().toDateString()
	).length;

	const getMealTypeLabel = (mealType: Meal['mealType']) => {
		switch (mealType) {
			case 'breakfast': return '朝食';
			case 'lunch': return '昼食';
			case 'dinner': return '夕食';
			case 'snack': return 'おやつ';
		}
	};

	const formatRelativeTime = (date: Date) => {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);

		if (diffDays > 0) {
			return `${diffDays}日前`;
		} else if (diffHours > 0) {
			return `${diffHours}時間前`;
		} else {
			return '今';
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>MenuSense</Text>
					<Text style={styles.subtitle}>今日の食事を記録しよう</Text>
				</View>

				{/* Quick Stats */}
				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<Text style={styles.statNumber}>{todayMealsCount}</Text>
						<Text style={styles.statLabel}>今日の食事</Text>
					</View>
					<View style={styles.statCard}>
						<Text style={styles.statNumber}>{recentMeals.length}</Text>
						<Text style={styles.statLabel}>総記録数</Text>
					</View>
				</View>

				{/* Quick Actions */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>クイックアクション</Text>
					<View style={styles.actionsContainer}>
						<TouchableOpacity 
							style={styles.actionButton}
							onPress={() => router.push('/camera')}
						>
							<Feather name="camera" size={24} color={colors.text.inverse} />
							<Text style={styles.actionButtonText}>写真を撮る</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.actionButtonSecondary}
							onPress={() => router.push('/recommendations')}
						>
							<Feather name="star" size={24} color={colors.main} />
							<Text style={styles.actionButtonSecondaryText}>おすすめ</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Recent Meals */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>最近の食事</Text>
						<TouchableOpacity onPress={() => router.push('/calendar')}>
							<Text style={styles.seeAllButton}>すべて見る</Text>
						</TouchableOpacity>
					</View>

					{recentMeals.map((meal) => (
						<View key={meal.id} style={styles.mealCard}>
							<Image 
								source={{ uri: meal.photoUri }} 
								style={styles.mealImage}
								defaultSource={require('@/assets/images/adaptive-icon.png')}
							/>
							<View style={styles.mealInfo}>
								<View style={styles.mealHeader}>
									<Text style={styles.mealType}>{getMealTypeLabel(meal.mealType)}</Text>
									<Text style={styles.mealTime}>{formatRelativeTime(meal.datetime)}</Text>
								</View>
								<Text style={styles.mealFoods}>
									{meal.recognizedFoods.map(food => food.name).join(', ')}
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* Today's Nutrition Summary */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>今日の栄養</Text>
					<View style={styles.nutritionSummary}>
						<View style={styles.nutritionItem}>
							<Text style={styles.nutritionLabel}>カロリー</Text>
							<Text style={styles.nutritionValue}>850kcal</Text>
						</View>
						<View style={styles.nutritionItem}>
							<Text style={styles.nutritionLabel}>たんぱく質</Text>
							<Text style={styles.nutritionValue}>35g</Text>
						</View>
						<View style={styles.nutritionItem}>
							<Text style={styles.nutritionLabel}>炭水化物</Text>
							<Text style={styles.nutritionValue}>95g</Text>
						</View>
						<View style={styles.nutritionItem}>
							<Text style={styles.nutritionLabel}>脂質</Text>
							<Text style={styles.nutritionValue}>25g</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	header: {
		padding: 20,
		alignItems: 'center'
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: colors.main,
		marginBottom: 4
	},
	subtitle: {
		fontSize: 16,
		color: colors.text.secondary
	},
	statsContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		gap: 16,
		marginBottom: 24
	},
	statCard: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 12,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3
	},
	statNumber: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.main,
		marginBottom: 4
	},
	statLabel: {
		fontSize: 14,
		color: colors.text.secondary
	},
	section: {
		paddingHorizontal: 20,
		marginBottom: 24
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text.primary
	},
	seeAllButton: {
		fontSize: 14,
		color: colors.main,
		fontWeight: 'bold'
	},
	actionsContainer: {
		flexDirection: 'row',
		gap: 12
	},
	actionButton: {
		flex: 1,
		backgroundColor: colors.main,
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8
	},
	actionButtonText: {
		color: colors.text.inverse,
		fontSize: 16,
		fontWeight: 'bold'
	},
	actionButtonSecondary: {
		flex: 1,
		backgroundColor: 'white',
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		borderWidth: 1,
		borderColor: colors.main
	},
	actionButtonSecondaryText: {
		color: colors.main,
		fontSize: 16,
		fontWeight: 'bold'
	},
	mealCard: {
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 12,
		marginBottom: 12,
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3
	},
	mealImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12
	},
	mealInfo: {
		flex: 1,
		justifyContent: 'space-between'
	},
	mealHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	mealType: {
		fontSize: 14,
		fontWeight: 'bold',
		color: colors.main
	},
	mealTime: {
		fontSize: 12,
		color: colors.text.muted
	},
	mealFoods: {
		fontSize: 14,
		color: colors.text.primary,
		marginTop: 4
	},
	nutritionSummary: {
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3
	},
	nutritionItem: {
		alignItems: 'center'
	},
	nutritionLabel: {
		fontSize: 12,
		color: colors.text.secondary,
		marginBottom: 4
	},
	nutritionValue: {
		fontSize: 14,
		fontWeight: 'bold',
		color: colors.main
	}
});
