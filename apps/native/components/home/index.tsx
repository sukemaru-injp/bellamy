import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import type { JSX } from 'react';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Oshi } from '../../models/Oshi';
import { Button } from '../common/Button';

const ACCOUNT_NAME = '仮アカウント';
const OSHI_STORAGE_KEY = 'oshi_storage_key';

export const Home = (): JSX.Element => {
	const router = useRouter();
	const [oshis, setOshis] = useState<Oshi[]>([]);

	useFocusEffect(
		useCallback(() => {
			const loadOshis = async () => {
				try {
					const jsonValue = await AsyncStorage.getItem(OSHI_STORAGE_KEY);
					if (jsonValue != null) {
						setOshis(JSON.parse(jsonValue));
					} else {
						setOshis([]);
					}
				} catch (e) {
					console.error('Failed to load oshis from storage', e);
					setOshis([]);
				}
			};
			loadOshis();
		}, [])
	);

	return (
		<View style={styles.container}>
			<View style={styles.accountContainer}>
				<Text style={styles.accountName}>{ACCOUNT_NAME}</Text>
			</View>

			<View style={styles.oshiContainer}>
				<Text style={styles.title}>推し一覧</Text>
				<FlatList
					data={oshis}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View
							style={[styles.oshiItem, { backgroundColor: item.themeColor }]}
						>
							<Text style={styles.oshiName}>{item.name}</Text>
						</View>
					)}
					ListEmptyComponent={<Text>推しが登録されていません</Text>}
				/>
			</View>
			<View>
				<Button
					title="追加"
					onPress={() => router.push('/oshi/add')}
					size="large"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	accountContainer: {
		marginBottom: 24
	},
	accountName: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	oshiContainer: {
		flex: 1
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8
	},
	oshiItem: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 8
	},
	oshiName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold'
	}
});
