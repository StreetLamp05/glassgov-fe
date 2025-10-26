'use client';

import { AISummary } from '@/lib/types';
import SummaryCard from './SummaryCard';
import GlassCard from '@/components/ui/GlassCard';

interface AISummaryProps {
    summary: AISummary;
    loading?: boolean;
}

export default function AISummaryComponent({ summary, loading }: AISummaryProps) {
    if (loading) {
        return (
            <div style={{ marginBottom: '2rem' }}>
                <div
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-block',
                            width: '40px',
                            height: '40px',
                            border: '4px solid rgba(255, 255, 255, 0.2)',
                            borderTop: '4px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '1rem',
                        }}
                    />
                    <p
                        style={{
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '500',
                        }}
                    >
                        Claude is analyzing the data...
                    </p>
                </div>
                <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    // Sentiment badge component
    const SentimentBadge = () => {
        const sentimentConfig = {
            positive: { color: '#10b981', emoji: '😊', label: 'Positive' },
            neutral: { color: '#6b7280', emoji: '😐', label: 'Neutral' },
            concerned: { color: '#f59e0b', emoji: '😟', label: 'Concerned' },
            critical: { color: '#ef4444', emoji: '😠', label: 'Critical' },
        };

        const config = sentimentConfig[summary.citizens.sentiment];

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: `${config.color}15`,
                    borderRadius: '20px',
                    border: `2px solid ${config.color}30`,
                }}
            >
                <span style={{ fontSize: '1.2rem' }}>{config.emoji}</span>
                <div>
                    <div
                        style={{
                            fontSize: '0.75rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '500',
                        }}
                    >
                        Overall Sentiment
                    </div>
                    <div
                        style={{
                            fontSize: '0.9rem',
                            color: config.color,
                            fontWeight: '700',
                        }}
                    >
                        {config.label}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            {/* Header */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                }}
            >
                <h2
                    style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span style={{ fontSize: '1.8rem' }}>✨</span>
                    AI Summary
                </h2>
                <p
                    style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                    }}
                >
                    Claude analyzed {summary.government.keyInitiatives.length + summary.citizens.topConcerns.length} data points
                </p>
            </div>

            {/* Two-column grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                }}
            >
                {/* Government Summary */}
                <SummaryCard
                    title="Government Actions"
                    icon="🏛️"
                    color="#667eea"
                    overview={summary.government.overview}
                    items={summary.government.keyInitiatives}
                    label="Key Initiatives"
                    additionalInfo={
                        summary.government.priorityAreas.length > 0 && (
                            <div>
                                <p
                                    style={{
                                        fontSize: '0.85rem',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Priority Areas:
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.5rem',
                                    }}
                                >
                                    {summary.government.priorityAreas.map((area, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: '0.35rem 0.75rem',
                                                background: '#667eea20',
                                                color: '#667eea',
                                                borderRadius: '12px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                            }}
                                        >
                      {area}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                />

                {/* Citizen Summary */}
                <SummaryCard
                    title="Citizen Concerns"
                    icon="💬"
                    color="#764ba2"
                    overview={summary.citizens.overview}
                    items={summary.citizens.topConcerns}
                    label="Top Concerns"
                    additionalInfo={<SentimentBadge />}
                />
            </div>

            {/* Insights (if available) */}
            {summary.insights && (
                <GlassCard variant="dark" padding="md">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                        }}
                    >
            <span
                style={{
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    flexShrink: 0,
                }}
            >
              💡
            </span>
                        <div style={{ flex: 1 }}>
                            <h4
                                style={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                Key Insights
                            </h4>
                            <p
                                style={{
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    margin: 0,
                                }}
                            >
                                {summary.insights}
                            </p>
                        </div>
                    </div>
                </GlassCard>
            )}

            {/* Timestamp */}
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.85rem',
                }}
            >
                Generated {new Date(summary.generatedAt).toLocaleString()}
            </div>
        </div>
    );
}