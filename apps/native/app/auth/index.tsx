import { LoginScreen } from '@/components/auth/LoginScreen';
import { SignupScreen } from '@/components/auth/SignupScreen';
import { useState } from 'react';

export default function AuthScreen() {
	const [isLogin, setIsLogin] = useState(true);

	const switchToSignup = () => setIsLogin(false);
	const switchToLogin = () => setIsLogin(true);

	return isLogin ? (
		<LoginScreen onSwitchToSignup={switchToSignup} />
	) : (
		<SignupScreen onSwitchToLogin={switchToLogin} />
	);
}
