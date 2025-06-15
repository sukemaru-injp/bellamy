import type { Oshi } from '@/models/Oshi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import type { JSX } from 'react';
import { useState } from 'react';
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

const OSHI_STORAGE_KEY = 'oshi_storage_key';
const THEME_COLORS = [
	'blue',
	'green',
	'pink',
	'orange',
	'red',
	'purple'
] as const;

const AddOshiScreen = (): JSX.Element => {
	const router = useRouter();
	const [name, setName] = useState('');
	const [memo, setMemo] = useState('');
	const [themeColor, setThemeColor] = useState<(typeof THEME_COLORS)[number]>(
		THEME_COLORS[0]
	);

	const handleSave = async () => {
		if (!name.trim()) {
			console.log('Name is required');
			return;
		}

		const newOshi: Oshi = {
			id: Date.now().toString(),
			name,
			memo,
			themeColor
		};

		try {
			const existingOshis = await AsyncStorage.getItem(OSHI_STORAGE_KEY);
			const oshis = existingOshis ? JSON.parse(existingOshis) : [];
			oshis.push(newOshi);
			await AsyncStorage.setItem(OSHI_STORAGE_KEY, JSON.stringify(oshis));
			router.back();
		} catch (e) {
			console.error('Failed to save oshi to storage', e);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.label}>名前</Text>
			<TextInput
				style={styles.input}
				value={name}
				onChangeText={setName}
				placeholder="推しの名前"
			/>

			<Text style={styles.label}>メモ</Text>
			<TextInput
				style={styles.input}
				value={memo}
				onChangeText={setMemo}
				placeholder="memo"
				multiline
			/>

			<Text style={styles.label}>テーマカラー</Text>
			<View style={styles.colorContainer}>
				{THEME_COLORS.map((color) => (
					<TouchableOpacity
						key={color}
						style={[
							styles.colorButton,
							{ backgroundColor: color },
							themeColor === color && styles.selectedColor
						]}
						onPress={() => setThemeColor(color)}
					/>
				))}
			</View>

			<Button title="保存" onPress={handleSave} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontSize: 16
	},
	colorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24
	},
	colorButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'transparent'
	},
	selectedColor: {
		borderColor: '#000'
	}
});

export default AddOshiScreen;
