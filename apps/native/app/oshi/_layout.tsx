import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="add" options={{ headerShown: false }} />
		</Stack>
	);
}
