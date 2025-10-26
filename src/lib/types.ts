// Category types
export type CategoryKey =
    | "food_access"
    | "road_safety"
    | "crime"
    | "housing"
    | "zoning"
    | "transport"
    | "budget"
    | "health";

export interface Category {
    key: CategoryKey;
    label: string;
    icon: string;
}

// Location/Geography types
export interface Geo {
    city?: string;
    county?: string;
    state_name?: string;
}

// API Request types
export interface DiscoverRequest {
    geo: Geo;
    message?: string;
    categories?: CategoryKey[];
    limits?: {
        per_category?: number;
    };
}

// Classification types
export interface ClassificationItem {
    label: CategoryKey;
    score: number;
}

export interface FastClassification {
    primary_category: CategoryKey;
    categories: ClassificationItem[];
    confidence: number;
    tags: string[];
    entities: Record<string, string[]>;
}

// Government Action types
export interface GovAction {
    id: string;
    title: string | null;
    summary: string | null;
    date: string | null; // ISO date string
    tags: string[];
    url: string | null;
    source_type: string | null; // "agenda" | "bill" | etc.
}

// Citizen Issue types
export interface CitizenIssue {
    id: string;
    title: string;
    score: number;
    created_at: string; // ISO date string
    primary_category: CategoryKey;
}

// Section types
export interface Section {
    category: CategoryKey;
    government_actions: GovAction[];
    citizen_issues: CitizenIssue[];
}

// Top Category types
export interface TopCategory {
    label: CategoryKey;
    count: number;
}

// API Response types
export interface DiscoverResponse {
    geo: Geo;
    top_categories?: TopCategory[];
    fast_classification?: FastClassification;
    sections: Section[];
    error?: string;
}

// Google Places types
export interface ParsedPlace {
    city?: string;
    county?: string;
    state_name?: string;
    formatted_address?: string;
}