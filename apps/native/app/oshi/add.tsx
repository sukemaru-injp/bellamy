import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import type { Oshi } from '@/models/Oshi';
import { colors } from '@/styles/foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Result, err, ok } from 'neverthrow';
import type { JSX } from 'react';
import { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
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
	const [nameError, setNameError] = useState('');
	const [memoError, setMemoError] = useState('');

	const validateName = (value: string): Result<string, string> => {
		if (!value.trim()) {
			return err('名前は必須です');
		}
		if (value.length > 20) {
			return err('名前は20文字以内で入力してください');
		}
		return ok(value);
	};

	const validateMemo = (value: string): Result<string, string> => {
		if (value.length > 400) {
			return err('メモは400文字以内で入力してください');
		}
		return ok(value);
	};

	const handleNameChange = (value: string) => {
		setName(value);
		const result = validateName(value);
		setNameError(result.isErr() ? result.error : '');
	};

	const handleMemoChange = (value: string) => {
		setMemo(value);
		const result = validateMemo(value);
		setMemoError(result.isErr() ? result.error : '');
	};

	const handleSave = async () => {
		const nameResult = validateName(name);
		const memoResult = validateMemo(memo);

		const combinedResult = Result.combine([nameResult, memoResult]);

		if (combinedResult.isErr()) {
			const [nameError, memoError] = combinedResult.error;
			setNameError(nameError || '');
			setMemoError(memoError || '');
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
			<Input
				label="名前"
				value={name}
				onChangeText={handleNameChange}
				placeholder="推しの名前"
			/>
			{nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

			<Input
				label="メモ"
				value={memo}
				onChangeText={handleMemoChange}
				placeholder="memo"
				multiline
			/>
			{memoError ? <Text style={styles.errorText}>{memoError}</Text> : null}

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
		padding: 16,
		backgroundColor: colors.background
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8
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
		borderColor: '#333',
		borderWidth: 3,
		transform: [{ scale: 1.1 }],
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	errorText: {
		color: 'red',
		fontSize: 14,
		marginTop: 4,
		marginBottom: 8
	}
});

export default AddOshiScreen;
