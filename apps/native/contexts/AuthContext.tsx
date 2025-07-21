import {
	type AuthActions,
	type AuthState,
	type User,
	mapSupabaseUser
} from '@/models/User';
import { supabase } from '@/modules/supabase';
import type { Session } from '@supabase/supabase-js';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType extends AuthState, AuthActions {}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ? mapSupabaseUser(session.user) : null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ? mapSupabaseUser(session.user) : null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signIn = async (email: string, password: string) => {
		try {
			setLoading(true);
			setError(null);
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const signUp = async (email: string, password: string) => {
		try {
			setLoading(true);
			setError(null);
			const { error } = await supabase.auth.signUp({
				email,
				password
			});
			if (error) throw error;
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const signOut = async () => {
		try {
			setLoading(true);
			setError(null);
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const resetPassword = async (email: string) => {
		try {
			setLoading(true);
			setError(null);
			const { error } = await supabase.auth.resetPasswordForEmail(email);
			if (error) throw error;
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const value: AuthContextType = {
		user,
		session,
		loading,
		error,
		signIn,
		signUp,
		signOut,
		resetPassword
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
