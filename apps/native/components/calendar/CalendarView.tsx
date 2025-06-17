import type { Oshi } from '@/models/Oshi';
import { colors } from '@/styles/foundation';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import type { Theme } from 'react-native-calendars/src/types';

const oshiMarkedDates: Record<Oshi['id'], { [key: string]: MarkingProps }> = {
	conan: {
		// idをキーにする
		'2025-07-10': {
			selected: true,
			marked: true
		},
		'2025-07-11': { marked: true }
	},
	aimyon: {
		// idをキーにする
		'2025-08-15': {
			selected: true,
			marked: true
		},
		'2025-08-16': { marked: true, dotColor: 'orange' }
	},
	sakurazaka: {
		// idをキーにする
		'2025-09-20': {
			selected: true,
			marked: true
		},
		'2025-09-21': { marked: true, dotColor: 'purple', activeOpacity: 0 }
	}
};

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
	selectedOshi?: Oshi;
	onClickDay: (d: Date) => void;
};

export default function CalendarView(props: Props) {
	const theme = useMemo(() => {
		return getTheme(props.selectedOshi?.themeColor ?? 'blue');
	}, [props.selectedOshi]);

	return (
		<Calendar
			key={props.selectedOshi?.id ?? 'none'}
			style={styles.calendar}
			onDayPress={(day) => {
				props.onClickDay(new Date(day.dateString));
			}}
			markedDates={
				props.selectedOshi ? oshiMarkedDates[props.selectedOshi.id] : undefined
			}
			theme={theme}
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
