import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
	id: string;
	email: string;
	created_at: string;
	email_confirmed_at?: string;
	last_sign_in_at?: string;
	app_metadata?: {
		provider?: string;
		providers?: string[];
	};
	user_metadata?: {
		name?: string;
		avatar_url?: string;
		full_name?: string;
		[key: string]: unknown;
	};
}

export interface AuthState {
	user: User | null;
	session: Session | null;
	loading: boolean;
	error: string | null;
}

export interface AuthActions {
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
}

export function mapSupabaseUser(supabaseUser: SupabaseUser): User {
	return {
		id: supabaseUser.id,
		email: supabaseUser.email || '',
		created_at: supabaseUser.created_at || '',
		email_confirmed_at: supabaseUser.email_confirmed_at,
		last_sign_in_at: supabaseUser.last_sign_in_at,
		app_metadata: supabaseUser.app_metadata,
		user_metadata: supabaseUser.user_metadata
	};
}
