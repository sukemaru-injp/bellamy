import { colors } from '@/styles/foundation';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { Theme } from 'react-native-calendars/src/types';

const getTheme = (themeColor: string): Theme => ({
	backgroundColor: colors.background,
	calendarBackground: colors.background,
	textSectionTitleColor: colors.main,
	selectedDayBackgroundColor: themeColor,
	selectedDayTextColor: '#ffffff',
	todayTextColor: themeColor,
	dayTextColor: colors.main,
	textDisabledColor: '#555',
	dotColor: themeColor,
	selectedDotColor: '#ffffff',
	arrowColor: themeColor,
	monthTextColor: colors.main,
	indicatorColor: themeColor,
	textDayFontWeight: '300',
	textMonthFontWeight: 'bold',
	textDayHeaderFontWeight: '300',
	textDayFontSize: 16,
	textMonthFontSize: 16,
	textDayHeaderFontSize: 14,
	stylesheet: {
		day: {
			basic: {
				flex: 1
			}
		}
	}
});

type Props = {
	onClickDay: (d: Date) => void;
};

export default function CalendarView(props: Props) {
	return (
		<Calendar
			style={styles.calendar}
			onDayPress={(day) => {
				props.onClickDay(new Date(day.dateString));
			}}
			theme={getTheme('#cc0000')} // Default theme color, can be replaced with props.selectedOshi?.themeColor
			showSixWeeks
			hideExtraDays={false}
		/>
	);
}

const styles = StyleSheet.create({
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: colors.main
	}
});
