import CalendarView from '@/components/calendar/CalendarView';
import type { Oshi } from '@/models/Oshi';
import { colors } from '@/styles/foundation';
import { Picker } from '@react-native-picker/picker';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const oshisData: Oshi[] = [
	{ id: 'conan', name: '相棒', themeColor: 'blue' },
	{ id: 'aimyon', name: 'あいみょん', themeColor: 'green' },
	{ id: 'sakurazaka', name: '櫻坂46', themeColor: 'pink' }
];

export default function CalendarScreen() {
	const handleClickDay = useCallback((date: Date) => {
		console.log('Selected date:', date);
	}, []);

	const [selectedOshiId, setSelectedOshiId] = useState<string>('conan');

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
					dropdownIconColor={
						oshisData.find((o) => o.id === selectedOshiId)?.themeColor
					}
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

			<CalendarView
				selectedOshi={oshisData.find((o) => o.id === selectedOshiId)}
				onClickDay={handleClickDay}
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
	}
});
