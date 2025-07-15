import CalendarView from '@/components/calendar/CalendarView';
import { colors } from '@/styles/foundation';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export default function CalendarScreen() {
	const handleClickDay = useCallback((date: Date) => {
		console.log('Selected date:', date);
	}, []);

	return (
		<View style={styles.container}>
			<CalendarView onClickDay={handleClickDay} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	}
});
