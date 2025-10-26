'use client';

import { useState, useEffect, useRef } from 'react';
import { DiscoverResponse, CategoryKey, Geo, AISummary } from '@/lib/types';
import { fetchDiscover } from '@/lib/api';
import { generateSummary } from '@/lib/claude';
import { STORAGE_KEYS, API_CONFIG } from '@/lib/constants';
import SearchForm from './SearchForm';
import LoadingState from './LoadingState';
import ResultsSection from './ResultsSection';
import AISummaryComponent from './AISummary';
import Image from "next/image";

export default function DiscoverSection() {
    const [response, setResponse] = useState<DiscoverResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // AI Summary state
    const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState('');

    // Form state for restoration
    const [savedLocation, setSavedLocation] = useState('');
    const [savedGeo, setSavedGeo] = useState<Geo>({});
    const [savedMessage, setSavedMessage] = useState('');
    const [savedCategories, setSavedCategories] = useState<CategoryKey[]>([]);

    const abortControllerRef = useRef<AbortController | null>(null);

    // Restore from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.LAST_QUERY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.geo) {
                    setSavedGeo(parsed.geo);
                    const parts = [
                        parsed.geo.city,
                        parsed.geo.county,
                        parsed.geo.state_name,
                    ].filter(Boolean);
                    setSavedLocation(parts.join(', '));
                }
                if (parsed.message) setSavedMessage(parsed.message);
                if (parsed.categories) setSavedCategories(parsed.categories);
            } catch (err) {
                console.error('Failed to restore saved query:', err);
            }
        }
    }, []);

    const handleSubmit = async (params: {
        geo: Geo;
        message?: string;
        categories?: CategoryKey[];
    }) => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError('');
        setAiSummary(null); // Clear previous summary
        setSummaryError('');

        const request = {
            geo: params.geo,
            message: params.message,
            categories: params.categories,
            limits: { per_category: API_CONFIG.DEFAULT_PER_CATEGORY_LIMIT },
        };

        try {
            const data = await fetchDiscover(request, abortControllerRef.current.signal);
            setResponse(data);

            // Save to localStorage
            localStorage.setItem(STORAGE_KEYS.LAST_QUERY, JSON.stringify(request));

            // Determine which mode we're in
            const hasMessage = !!params.message && params.message.trim().length > 0;
            const hasCategories = params.categories && params.categories.length > 0;
            const isLocationOnly = !hasMessage && !hasCategories;

            console.log('=== DISCOVER MODE ===');
            console.log('Message:', params.message);
            console.log('hasMessage:', hasMessage);
            console.log('hasCategories:', hasCategories);
            console.log('isLocationOnly:', isLocationOnly);
            console.log('====================');

            // Generate AI summary for location-only OR category-filtered queries
            // Also generate action plan if user provided a message
            if (data.sections.length > 0 && (isLocationOnly || hasCategories || hasMessage)) {
                console.log('Generating AI summary...', { hasMessage, hasCategories, isLocationOnly });
                setSummaryLoading(true);

                try {
                    const summary = await generateSummary(
                        params.geo,
                        data.sections,
                        data.top_categories,
                        hasMessage ? params.message : undefined // Pass message only if present
                    );
                    setAiSummary(summary);
                    console.log('AI summary generated successfully', { hasActionPlan: !!summary.actionPlan });
                } catch (summaryErr: any) {
                    console.error('Failed to generate AI summary:', summaryErr);
                    setSummaryError('Failed to generate AI summary. Showing results without summary.');
                } finally {
                    setSummaryLoading(false);
                }
            }
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                setError(err.message || 'Something went wrong. Please try again.');
                console.error('Discover API error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category: CategoryKey) => {
        // Scroll to the category accordion
        const element = document.getElementById(`category-${category}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                minHeight: '100vh',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '3rem',
                    paddingTop: '2rem',
                }}
            >
                <Image
                    src="/glassgov-logo.png"
                    alt="GlassGov Logo"
                    width={60}
                    height={60}
                    style={{ borderRadius: '8px' }}
                />
                <h1
                    style={{
                        fontSize: '3rem',
                        color: 'white',
                        fontWeight: '700',
                        letterSpacing: '-1px',
                    }}
                >
                    GlassGov
                </h1>
            </div>

            {/* Search Form */}
            <div style={{ marginBottom: '2rem' }}>
                <SearchForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    topCategories={response?.top_categories}
                    initialLocation={savedLocation}
                    initialGeo={savedGeo}
                    initialMessage={savedMessage}
                    initialCategories={savedCategories}
                />
            </div>

            {/* Loading State */}
            {loading && <LoadingState />}

            {/* AI Summary */}
            {!loading && response && (aiSummary || summaryLoading) && (
                <AISummaryComponent
                    summary={aiSummary!}
                    loading={summaryLoading}
                />
            )}

            {/* Summary Error (non-blocking) */}
            {summaryError && (
                <div
                    style={{
                        marginBottom: '2rem',
                        padding: '1rem',
                        background: 'rgba(251, 191, 36, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span>⚠️</span>
                    <span>{summaryError}</span>
                </div>
            )}

            {/* Results */}
            {response && !loading && (
                <ResultsSection
                    response={response}
                    onCategoryClick={handleCategoryClick}
                />
            )}

            {/* Initial State Message */}
            {!response && !loading && !error && (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: 'white',
                    }}
                >
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>👆</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Start by selecting your location
                    </p>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                        We'll show you what's happening in your area
                    </p>
                </div>
            )}
        </div>
    );
}