# Changelog

All notable changes to the MenuSense project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-07-21

### Added

#### Supabase Authentication System
- **Authentication Context**: Complete auth state management with `AuthContext.tsx`
  - User session handling with automatic refresh
  - Sign in, sign up, and sign out functionality
  - Error handling and loading states
- **User Model**: Type-safe user data structure (`models/User.ts`)
  - Supabase user mapping functions
  - Authentication state interfaces
- **Authentication UI Components**:
  - `LoginScreen.tsx` - Login form with validation
  - `SignupScreen.tsx` - Registration form with password confirmation
  - Form validation and error messaging in Japanese
- **Route Protection**: Automatic redirect to auth screen for unauthenticated users
- **Environment Configuration**: Supabase client configured with environment variables
  - `EXPO_PUBLIC_SUPABASE_PROJECT_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

#### Component Architecture Improvements
- **AuthorizedView Component**: Separated authenticated user interface
  - All main dashboard functionality (stats, actions, meal history, nutrition)
  - User email display and logout functionality
  - Reusable component design

### Changed

#### Home Component Refactoring
- **Single Responsibility**: Home component now serves only as authentication guard
- **Code Size Reduction**: Reduced from 400+ lines to 55 lines (86% reduction)
- **Separation of Concerns**: Authentication logic separated from UI rendering
- **Improved Maintainability**: Cleaner, more testable component structure

#### Application Layout
- **AuthProvider Integration**: Wrapped entire app with authentication context
- **Auth Route Addition**: Added `/auth` route for login/signup screens
- **Automatic Session Management**: Persistent sessions with auto-refresh

### Technical Details

#### New Files
- `contexts/AuthContext.tsx` - Authentication state management
- `models/User.ts` - User type definitions and utilities
- `components/auth/LoginScreen.tsx` - Login interface
- `components/auth/SignupScreen.tsx` - Registration interface
- `app/auth/index.tsx` - Authentication screen router
- `components/home/AuthorizedView.tsx` - Post-authentication main screen

#### Modified Files
- `modules/supabase.ts` - Environment variable configuration
- `app/_layout.tsx` - AuthProvider integration
- `components/home/index.tsx` - Simplified to authentication guard
- `models/index.ts` - Added User type exports

#### Development Quality
- **Type Safety**: Full TypeScript coverage with proper error handling
- **Code Standards**: All code passes Biome lint and format checks
- **Architecture**: Follows React best practices and single responsibility principle

### Migration Notes

To use the new authentication system:

1. Set up Supabase environment variables in `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_PROJECT_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. Users will be automatically redirected to login if not authenticated
3. All existing functionality remains the same post-authentication

---

## [0.1.0] - Initial Release

### Added
- Initial React Native app structure with Expo
- Basic navigation with tab layout (Camera, History, Analytics)
- Mock data and UI components for meal tracking
- TypeScript configuration
- Biome linting and formatting setup