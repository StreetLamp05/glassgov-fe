'use client';

import { DiscoverResponse, CategoryKey } from '@/lib/types';
import MetricsStrip from './MetricsStrip';
import TopCategories from './TopCategories';
import CategoryAccordion from './CategoryAccordion';

interface ResultsSectionProps {
    response: DiscoverResponse;
    onCategoryClick?: (category: CategoryKey) => void;
}

export default function ResultsSection({
                                           response,
                                           onCategoryClick,
                                       }: ResultsSectionProps) {
    // Calculate total items
    const totalItems = response.sections.reduce(
        (sum, section) =>
            sum + section.government_actions.length + section.citizen_issues.length,
        0
    );

    // Check if we have any results
    const hasResults = response.sections.length > 0;

    return (
        <div>
            {/* Metrics Strip */}
            <MetricsStrip geo={response.geo} totalItems={totalItems} />

            {/* Top Categories (if available) */}
            {response.top_categories && response.top_categories.length > 0 && (
                <TopCategories
                    topCategories={response.top_categories}
                    onCategoryClick={onCategoryClick}
                />
            )}

            {/* Fast Classification Info (if available) */}
            {response.fast_classification && (
                <div
                    style={{
                        marginBottom: '2rem',
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🎯</span>
                        <span style={{ fontWeight: '600', fontSize: '1rem' }}>
              Your concern matches:
            </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                        {response.fast_classification.categories.slice(0, 3).map((cat) => (
                            <span
                                key={cat.label}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '16px',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                }}
                            >
                <span>{cat.label.replace('_', ' ')}</span>
                <span style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                  {Math.round(cat.score * 100)}%
                </span>
              </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Divider between AI summary and raw data */}
            <div
                style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    }}
                />
                <span
                    style={{
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                    }}
                >
          📋 Detailed Data
        </span>
                <div
                    style={{
                        flex: 1,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    }}
                />
            </div>

            {/* Results */}
            {!hasResults ? (
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '3rem',
                        borderRadius: '16px',
                        textAlign: 'center',
                        color: '#666',
                    }}
                >
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        No recent items found
                    </p>
                    <p style={{ fontSize: '1rem' }}>
                        Try widening your search area or selecting different categories.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {response.sections.map((section, index) => (
                        <CategoryAccordion
                            key={section.category}
                            section={section}
                            defaultExpanded={index === 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}