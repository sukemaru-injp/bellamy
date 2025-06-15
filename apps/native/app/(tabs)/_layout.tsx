import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function RootLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#ffd33d'
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
