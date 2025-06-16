import type { Oshi } from '@/models/Oshi';
import { colors } from '@/styles/foundation';
import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import type { Theme } from 'react-native-calendars/src/types';

const oshisData: Oshi[] = [
	{ id: 'conan', name: '相棒', themeColor: 'blue' },
	{ id: 'aimyon', name: 'あいみょん', themeColor: 'green' },
	{ id: 'sakurazaka', name: '櫻坂46', themeColor: 'pink' }
];

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

export default function CalendarView() {
	const [selectedOshiId, setSelectedOshiId] = useState<string>(oshisData[1].id);

	const selectedOshi = useMemo(
		() => oshisData.find((o) => o.id === selectedOshiId),
		[selectedOshiId]
	);

	const theme = useMemo(() => {
		return getTheme(selectedOshi?.themeColor ?? 'blue');
	}, [selectedOshi]);

	return (
		<View style={styles.container}>
			<View style={styles.oshiSelectorContainer}>
				<Picker
					selectedValue={selectedOshiId}
					style={styles.picker}
					itemStyle={styles.pickerItem}
					onValueChange={(itemValue) => {
						console.log('Selected Oshi ID:', itemValue);
						setSelectedOshiId(itemValue);
					}}
					dropdownIconColor={selectedOshi?.themeColor}
				>
					{oshisData.map((oshi) => (
						<Picker.Item
							key={oshi.id}
							label={oshi.name}
							value={oshi.id}
							color={oshi.themeColor}
						/>
					))}
				</Picker>
			</View>
			<Calendar
				key={selectedOshiId}
				style={styles.calendar}
				onDayPress={(day) => {
					console.log('selected day', day);
				}}
				markedDates={oshiMarkedDates[selectedOshiId]}
				theme={theme}
				showSixWeeks
				hideExtraDays={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	oshiSelectorContainer: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: colors.background,
		justifyContent: 'center'
	},
	picker: {
		height: 55,
		width: '90%',
		alignSelf: 'center'
	},
	pickerItem: {
		color: '#fff',
		backgroundColor: colors.background
	},
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: colors.main
	}
});
