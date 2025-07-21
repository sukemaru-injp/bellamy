import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/styles/foundation';
import { useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

interface SignupScreenProps {
	onSwitchToLogin: () => void;
}

export function SignupScreen({ onSwitchToLogin }: SignupScreenProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { signUp, loading, error } = useAuth();

	const handleSignup = async () => {
		if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
			Alert.alert('エラー', 'すべての項目を入力してください');
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert('エラー', 'パスワードが一致しません');
			return;
		}

		if (password.length < 6) {
			Alert.alert('エラー', 'パスワードは6文字以上で入力してください');
			return;
		}

		try {
			await signUp(email.trim(), password);
			Alert.alert(
				'登録完了',
				'確認メールを送信しました。メール内のリンクをクリックしてアカウントを有効化してください。'
			);
		} catch (error) {
			console.error('Signup error:', error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>MenuSense</Text>
				<Text style={styles.subtitle}>新規アカウントを作成</Text>

				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="メールアドレス"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						editable={!loading}
					/>

					<TextInput
						style={styles.input}
						placeholder="パスワード（6文字以上）"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						autoCapitalize="none"
						autoCorrect={false}
						editable={!loading}
					/>

					<TextInput
						style={styles.input}
						placeholder="パスワード確認"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
						autoCapitalize="none"
						autoCorrect={false}
						editable={!loading}
					/>

					{error && <Text style={styles.errorText}>{error}</Text>}

					<TouchableOpacity
						style={[styles.button, loading && styles.buttonDisabled]}
						onPress={handleSignup}
						disabled={loading}
					>
						<Text style={styles.buttonText}>
							{loading ? '登録中...' : '新規登録'}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.switchButton}
						onPress={onSwitchToLogin}
						disabled={loading}
					>
						<Text style={styles.switchText}>
							アカウントをお持ちの方は ログイン
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: colors.main,
		textAlign: 'center',
		marginBottom: 8
	},
	subtitle: {
		fontSize: 16,
		color: colors.text.secondary,
		textAlign: 'center',
		marginBottom: 32
	},
	form: {
		gap: 16
	},
	input: {
		backgroundColor: '#ffffff',
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#e0e0e0'
	},
	button: {
		backgroundColor: colors.main,
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
		marginTop: 8
	},
	buttonDisabled: {
		opacity: 0.6
	},
	buttonText: {
		color: colors.text.inverse,
		fontSize: 16,
		fontWeight: '600'
	},
	switchButton: {
		paddingVertical: 16,
		alignItems: 'center'
	},
	switchText: {
		color: colors.text.secondary,
		fontSize: 14
	},
	errorText: {
		color: colors.error,
		fontSize: 14,
		textAlign: 'center'
	}
});
