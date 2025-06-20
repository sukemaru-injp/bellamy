import { vi } from 'vitest'

// Mock Expo modules
vi.mock('expo-font')
vi.mock('expo-asset')
vi.mock('expo-constants', () => ({
  expoConfig: {},
}))

// Mock react-native-calendars
vi.mock('react-native-calendars', () => ({
  Calendar: 'Calendar',
}))