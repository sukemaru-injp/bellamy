import type React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	View
} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
	label?: string;
	error?: string;
	size?: 'small' | 'medium' | 'large';
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	size = 'medium',
	...textInputProps
}) => {
	const inputStyle = [styles.input, styles[size], error && styles.error];

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={inputStyle}
				placeholderTextColor="#999"
				{...textInputProps}
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 8
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		marginBottom: 6
	},
	input: {
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#ddd',
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#333',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2
	},
	small: {
		paddingVertical: 8,
		minHeight: 36,
		fontSize: 14
	},
	medium: {
		paddingVertical: 12,
		minHeight: 44,
		fontSize: 16
	},
	large: {
		paddingVertical: 16,
		minHeight: 52,
		fontSize: 18
	},
	error: {
		borderColor: '#e74c3c',
		borderWidth: 2
	},
	errorText: {
		fontSize: 12,
		color: '#e74c3c',
		marginTop: 4
	}
});
