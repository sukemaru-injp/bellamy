import CameraView from '@/components/camera/CameraView';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function CameraScreen() {
	const router = useRouter();

	const handlePhotoTaken = useCallback((photoUri: string) => {
		router.push(`/meal-confirm?photoUri=${encodeURIComponent(photoUri)}`);
	}, [router]);

	return <CameraView onPhotoTaken={handlePhotoTaken} />;
}