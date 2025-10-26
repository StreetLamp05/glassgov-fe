import { Category, CategoryKey } from './types';

// Category definitions with icons and labels
export const CATEGORIES: Category[] = [
    { key: 'food_access', label: 'Food Access', icon: '🍎' },
    { key: 'road_safety', label: 'Road Safety', icon: '🚦' },
    { key: 'crime', label: 'Crime', icon: '🚨' },
    { key: 'housing', label: 'Housing', icon: '🏠' },
    { key: 'zoning', label: 'Zoning', icon: '🗺️' },
    { key: 'transport', label: 'Transport', icon: '🚌' },
    { key: 'budget', label: 'Budget', icon: '💰' },
    { key: 'health', label: 'Health', icon: '🏥' },
];

// Helper function to get category by key
export function getCategoryByKey(key: CategoryKey): Category | undefined {
    return CATEGORIES.find(cat => cat.key === key);
}

// Helper function to get category label
export function getCategoryLabel(key: CategoryKey): string {
    return getCategoryByKey(key)?.label || key;
}

// Helper function to get category icon
export function getCategoryIcon(key: CategoryKey): string {
    return getCategoryByKey(key)?.icon || '📋';
}

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001',
    DISCOVER_ENDPOINT: '/api/v1/discover/',
    DEFAULT_PER_CATEGORY_LIMIT: 5,
    REQUEST_TIMEOUT: 30000, // 30 seconds
};

// Google Places Configuration
export const GOOGLE_PLACES_CONFIG = {
    API_KEY: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '',
    LIBRARIES: ['places'] as const,
    OPTIONS: {
        types: ['(regions)'], // Only return cities, counties, states
        componentRestrictions: { country: 'us' }, // Restrict to US
    },
};

// LocalStorage Keys
export const STORAGE_KEYS = {
    LAST_QUERY: 'glassgov_last_query',
    INTRO_SEEN: 'glassgov_intro_seen',
};

// UI Configuration
export const UI_CONFIG = {
    DEBOUNCE_DELAY: 300, // ms
    ANIMATION_DURATION: 300, // ms
    MAX_SUMMARY_LENGTH: 150, // characters
};

// Claude API Configuration
export const CLAUDE_CONFIG = {
    MODEL: 'claude-sonnet-4-20250514', // Claude Sonnet
    MAX_TOKENS: 2048,
    TEMPERATURE: 0.7,
    SUMMARIZE_ENDPOINT: '/api/summarize',
    REQUEST_TIMEOUT: 45000, // 45 seconds (Claude can take a bit)
};