import { colors } from '@/styles/foundation';
import Feather from '@expo/vector-icons/Feather';
import { type CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

interface CameraViewProps {
	onPhotoTaken: (photoUri: string) => void;
}

export default function CameraViewComponent({ onPhotoTaken }: CameraViewProps) {
	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();
	const [photo, setPhoto] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const cameraRef = useRef<CameraView>(null);

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>カメラへのアクセス許可が必要です</Text>
				<TouchableOpacity style={styles.button} onPress={requestPermission}>
					<Text style={styles.buttonText}>許可する</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const toggleCameraFacing = () => {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	};

	const takePicture = async () => {
		if (!cameraRef.current) return;

		try {
			setIsLoading(true);
			const photo = await cameraRef.current.takePictureAsync({
				quality: 0.8,
				base64: false
			});

			if (photo) {
				setPhoto(photo.uri);
			}
		} catch (_error: unknown) {
			Alert.alert('エラー', '写真の撮影に失敗しました');
		} finally {
			setIsLoading(false);
		}
	};

	const retakePicture = () => {
		setPhoto(null);
	};

	const confirmPhoto = () => {
		if (photo) {
			onPhotoTaken(photo);
			setPhoto(null);
		}
	};

	if (photo) {
		return (
			<View style={styles.container}>
				<Image source={{ uri: photo }} style={styles.preview} />
				<View style={styles.previewControls}>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={retakePicture}
					>
						<Text style={styles.secondaryButtonText}>やり直し</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={confirmPhoto}>
						<Text style={styles.buttonText}>使用する</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} facing={facing} ref={cameraRef}>
				<View style={styles.controls}>
					<TouchableOpacity
						style={styles.flipButton}
						onPress={toggleCameraFacing}
					>
						<Feather name="rotate-ccw" size={24} color="white" />
					</TouchableOpacity>
				</View>
				<View style={styles.captureContainer}>
					<TouchableOpacity
						style={[
							styles.captureButton,
							isLoading && styles.captureButtonDisabled
						]}
						onPress={takePicture}
						disabled={isLoading}
					>
						<View style={styles.captureButtonInner} />
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.background
	},
	message: {
		textAlign: 'center',
		paddingBottom: 16,
		fontSize: 16
	},
	camera: {
		flex: 1
	},
	controls: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 20
	},
	flipButton: {
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 25,
		padding: 10
	},
	captureContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 50
	},
	captureButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: 'white',
		borderWidth: 5,
		borderColor: colors.main,
		justifyContent: 'center',
		alignItems: 'center'
	},
	captureButtonDisabled: {
		opacity: 0.5
	},
	captureButtonInner: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.main
	},
	preview: {
		flex: 1,
		width: '100%'
	},
	previewControls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20,
		backgroundColor: colors.background
	},
	button: {
		backgroundColor: colors.main,
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 25
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	secondaryButton: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: colors.main,
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 25
	},
	secondaryButtonText: {
		color: colors.main,
		fontWeight: 'bold',
		fontSize: 16
	}
});
