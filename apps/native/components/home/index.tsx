import type { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Home = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>アカウント設定</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8
	}
});
