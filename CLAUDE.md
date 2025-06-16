# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bellamy is a React Native mobile app built with Expo for tracking "oshi" (favorite idols/entertainers) schedules and events. The app is structured as a monorepo using Turborepo and pnpm workspaces.

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
  - Tab layout: `app/(tabs)/_layout.tsx` (Bottom tabs: Home, Calendar)
- **Navigation**: Bottom tab navigation with Home and Calendar screens
- **State**: Currently uses local state (no global state management yet)
- **Styling**: Custom theme system in `styles/foundation.ts` with consistent colors

### Data Models
- **Oshi**: Represents favorite entertainers (`models/Oshi.ts`)
  - Properties: id, name, memo, themeColor
- **Schedule**: Event/schedule data (`models/Schedule.ts`)  
  - Properties: id, title, oshiId, datetime, category, notifications, repeat settings
  - Categories: live, stream, event, release, other

### Key Components
- **CalendarView**: Main calendar interface with oshi-specific theming
  - Uses react-native-calendars
  - Dynamic theming based on selected oshi
  - Hardcoded sample data (oshisData, oshiMarkedDates)

### Technology Stack
- React Native with Expo SDK ~53
- TypeScript throughout
- Biome for linting/formatting
- React Navigation for tab navigation
- react-native-calendars for calendar functionality
- Expo Router for file-based routing

## Development Notes

### File Paths
- Use absolute imports with `@/` prefix (configured in TypeScript)
- Models are in `apps/native/models/`
- Shared styles in `apps/native/styles/foundation.ts`
- Components organized by feature in `apps/native/components/`

### Theming
- Colors defined in `styles/foundation.ts`
- Each oshi has a themeColor that affects calendar appearance
- Main theme colors: `colors.main` (#f5b08b), `colors.background` (#fef7e4)

### Current Limitations
- Sample data is hardcoded in components
- No persistent storage implementation yet
- No actual schedule creation/editing functionality
- No notification system implementation