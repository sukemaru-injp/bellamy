import { colors } from '@/styles/foundation';
import type React from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

export interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: 'primary' | 'secondary';
	disabled?: boolean;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = 'primary',
	disabled = false,
	loading = false,
	size = 'medium'
}) => {
	const buttonStyle = [
		styles.button,
		styles[size],
		variant === 'primary' ? styles.primary : styles.secondary,
		disabled && styles.disabled
	];

	const textStyle = [
		styles.text,
		styles[`${size}Text`],
		variant === 'primary' ? styles.primaryText : styles.secondaryText,
		disabled && styles.disabledText
	];

	return (
		<TouchableOpacity
			style={buttonStyle}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{loading ? (
				<ActivityIndicator
					color={variant === 'primary' ? '#fff' : colors.main}
					size="small"
				/>
			) : (
				<Text style={textStyle}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3
	},
	primary: {
		backgroundColor: colors.main
	},
	secondary: {
		backgroundColor: colors.background,
		borderWidth: 2,
		borderColor: colors.secondary
	},
	disabled: {
		opacity: 0.5,
		shadowOpacity: 0,
		elevation: 0
	},
	// Size variants
	small: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		minHeight: 36
	},
	medium: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		minHeight: 44
	},
	large: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		minHeight: 52
	},
	// Text styles
	text: {
		fontWeight: '600',
		textAlign: 'center'
	},
	smallText: {
		fontSize: 14
	},
	mediumText: {
		fontSize: 16
	},
	largeText: {
		fontSize: 18
	},
	primaryText: {
		color: '#fff'
	},
	secondaryText: {
		color: colors.main
	},
	disabledText: {
		opacity: 0.7
	}
});
