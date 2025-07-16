import { colors } from '@/styles/foundation';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
export default function RootLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.main,
				tabBarStyle: {
					backgroundColor: colors.background
				},
				headerStyle: {
					backgroundColor: colors.background
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<Feather name="home" color={color} size={24} />
					)
				}}
			/>
			<Tabs.Screen
				name="camera"
				options={{
					title: 'Camera',
					tabBarIcon: ({ color }) => (
						<Feather name="camera" color={color} size={24} />
					)
				}}
			/>
			<Tabs.Screen
				name="recommendations"
				options={{
					title: 'Recommendations',
					tabBarIcon: ({ color }) => (
						<Feather name="star" color={color} size={24} />
					)
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					tabBarIcon: ({ color }) => (
						<Feather name="calendar" color={color} size={24} />
					)
				}}
			/>
		</Tabs>
	);
}
