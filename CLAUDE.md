# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MenuSense is a React Native mobile app built with Expo for recording daily meals through photos and providing AI-powered menu recommendations. The app uses Gemini Flash 2.5 for food recognition and analyzes eating patterns to suggest nutritionally balanced meals. The app is structured as a monorepo using Turborepo and pnpm workspaces.

## Development Commands

### Setup
```bash
pnpm install  # Install all dependencies
```

### Development
```bash
# Run all workspaces dev servers
pnpm dev

# Run native app specifically
pnpm --filter native dev
# or
cd apps/native && pnpm dev

# Platform-specific development
pnpm --filter native android
pnpm --filter native ios  
pnpm --filter native web
```

### Code Quality
```bash
# Lint and format (uses Biome)
pnpm lint
pnpm format
pnpm check  # Combined lint + format + type check

# Native app specific
cd apps/native
pnpm lint
pnpm format  
pnpm check
```

### Build
```bash
pnpm build  # Build all workspaces via Turbo
```

## Architecture

### Monorepo Structure
- **Root**: Turborepo orchestration with pnpm workspaces
- **apps/native/**: Main Expo React Native application
- **packages/**: Shared utilities and configurations (future expansion)

### App Architecture
- **Routing**: Expo Router with file-based routing
  - Root layout: `app/_layout.tsx` (Stack navigator)
  - Tab layout: `app/(tabs)/_layout.tsx` (Bottom tabs: Camera, History, Analytics)
- **Navigation**: Bottom tab navigation with Camera, History, and Analytics screens
- **State**: Currently uses local state (no global state management yet)
- **Styling**: Custom theme system in `styles/foundation.ts` with consistent colors

### Data Models
- **Meal**: Represents recorded meals (`models/Meal.ts`)
  - Properties: id, photoUri, recognizedFoods, datetime, nutrition, notes
- **Food**: Individual food items (`models/Food.ts`)
  - Properties: id, name, category, nutrition, confidence
- **Recommendation**: AI-generated menu suggestions (`models/Recommendation.ts`)
  - Properties: id, suggestedFoods, reason, nutritionalBalance, timestamp

### Key Components
- **CameraView**: Main photo capture interface for meal recording
  - Uses expo-camera for photo capture
  - Integrates with Gemini Flash 2.5 for food recognition
- **HistoryView**: Displays past meals and eating patterns
- **AnalyticsView**: Shows nutritional analysis and recommendations

### Technology Stack
- React Native with Expo SDK ~53
- TypeScript throughout
- Biome for linting/formatting
- React Navigation for tab navigation
- Expo Camera for photo capture
- Gemini Flash 2.5 for AI food recognition
- Expo Router for file-based routing

## Development Notes

### File Paths
- Use absolute imports with `@/` prefix (configured in TypeScript)
- Models are in `apps/native/models/`
- Shared styles in `apps/native/styles/foundation.ts`
- Components organized by feature in `apps/native/components/`

### Theming
- Colors defined in `styles/foundation.ts`
- Food category-based color coding for visual organization
- Main theme colors: `colors.main` (#f5b08b), `colors.background` (#fef7e4)

### Current Limitations
- Sample data is hardcoded in components
- No persistent storage implementation yet
- No actual AI integration with Gemini Flash 2.5 yet
- No nutrition analysis functionality implemented
- No recommendation engine implementation