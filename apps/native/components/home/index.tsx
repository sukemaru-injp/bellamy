import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/styles/foundation';
import { useRouter } from 'expo-router';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AuthorizedView } from './AuthorizedView';

export const Home = (): JSX.Element | null => {
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (!loading && !user) {
			router.replace('/auth');
		}
	}, [user, loading, router]);

	if (loading) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<ActivityIndicator size="large" color={colors.main} />
				<Text style={styles.loadingText}>読み込み中...</Text>
			</View>
		);
	}

	if (!user) {
		return null; // Will redirect to auth in useEffect
	}

	return <AuthorizedView />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	loadingContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: colors.text.secondary
	}
});
