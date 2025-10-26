'use client';

import GlassCard from '@/components/ui/GlassCard';

interface SummaryCardProps {
    title: string;
    icon: string;
    color: string;
    overview: string;
    items: string[];
    label: string; // e.g., "Key Initiatives" or "Top Concerns"
    additionalInfo?: React.ReactNode;
}

export default function SummaryCard({
                                        title,
                                        icon,
                                        color,
                                        overview,
                                        items,
                                        label,
                                        additionalInfo,
                                    }: SummaryCardProps) {
    return (
        <GlassCard
            variant="light"
            padding="lg"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: `2px solid ${color}20`,
                }}
            >
                <div
                    style={{
                        fontSize: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        borderRadius: '16px',
                        border: `2px solid ${color}30`,
                    }}
                >
                    {icon}
                </div>
                <div>
                    <h3
                        style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: color,
                            margin: 0,
                        }}
                    >
                        {title}
                    </h3>
                    <p
                        style={{
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            margin: '0.25rem 0 0 0',
                        }}
                    >
                        AI-Generated Summary
                    </p>
                </div>
            </div>

            {/* Overview */}
            <div
                style={{
                    marginBottom: '1.5rem',
                }}
            >
                <p
                    style={{
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: '#333',
                        margin: 0,
                    }}
                >
                    {overview}
                </p>
            </div>

            {/* Items List */}
            {items.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <h4
                        style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: color,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '0.75rem',
                        }}
                    >
                        {label}
                    </h4>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                        }}
                    >
                        {items.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: `${color}08`,
                                    borderRadius: '8px',
                                    borderLeft: `3px solid ${color}`,
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = `${color}15`;
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = `${color}08`;
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                <span
                    style={{
                        fontSize: '1rem',
                        color: color,
                        fontWeight: '700',
                        minWidth: '20px',
                    }}
                >
                  •
                </span>
                                <span
                                    style={{
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        color: '#555',
                                    }}
                                >
                  {item}
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Additional Info */}
            {additionalInfo && (
                <div
                    style={{
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {additionalInfo}
                </div>
            )}
        </GlassCard>
    );
}