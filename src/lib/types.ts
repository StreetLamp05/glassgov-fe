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

// AI Summary types
export interface SummarySection {
    title: string;
    content: string;
    keyPoints?: string[];
}

export interface ContactInfo {
    name: string;
    title: string;
    phone?: string;
    email?: string;
    officeHours?: string;
    website?: string;
}

export interface ActionPlan {
    overview: string; // 1-2 sentences on why this action matters
    contacts: ContactInfo[]; // List of officials to contact
    callScript: string; // Template for phone calls
    emailTemplate: string; // Template for emails
    tips: string[]; // Best practices for effective communication
    nextSteps: string[]; // Additional actions they can take
}

export interface AISummary {
    government: {
        overview: string;
        keyInitiatives: string[];
        priorityAreas: string[];
    };
    citizens: {
        overview: string;
        topConcerns: string[];
        sentiment: 'positive' | 'neutral' | 'concerned' | 'critical';
    };
    insights?: string;
    actionPlan?: ActionPlan; // Only present for message-based queries
    generatedAt: string; // ISO timestamp
}

export interface SummarizeRequest {
    geo: Geo;
    sections: Section[];
    top_categories?: TopCategory[];
    user_message?: string;
}

export interface SummarizeResponse {
    summary: AISummary;
    error?: string;
}