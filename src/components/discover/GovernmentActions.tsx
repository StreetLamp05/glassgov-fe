'use client';

import { GovAction } from '@/lib/types';
import { UI_CONFIG } from '@/lib/constants';

interface GovernmentActionsProps {
    actions: GovAction[];
}

export default function GovernmentActions({ actions }: GovernmentActionsProps) {
    // Format date to readable string
    const formatDate = (isoString: string | null): string => {
        if (!isoString) return 'Date unknown';
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        } catch {
            return 'Date unknown';
        }
    };

    // Truncate summary
    const truncateSummary = (text: string | null): string => {
        if (!text) return '';
        if (text.length <= UI_CONFIG.MAX_SUMMARY_LENGTH) return text;
        return text.slice(0, UI_CONFIG.MAX_SUMMARY_LENGTH) + '...';
    };

    if (actions.length === 0) {
        return (
            <div>
                <h4
                    style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#667eea',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span>🏛️</span>
                    Government Actions
                </h4>
                <p
                    style={{
                        color: '#999',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        padding: '1rem',
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}
                >
                    No recent government actions
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4
                style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#667eea',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span>🏛️</span>
                Government Actions
                <span
                    style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                    }}
                >
          {actions.length}
        </span>
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {actions.map((action) => (
                    <li
                        key={action.id}
                        style={{
                            marginBottom: '0.75rem',
                            padding: '1rem',
                            background: 'rgba(102, 126, 234, 0.05)',
                            borderRadius: '8px',
                            borderLeft: '3px solid #667eea',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        {/* Title */}
                        {action.url ? (
                            <a
                                href={action.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#667eea',
                                    textDecoration: 'none',
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#764ba2';
                                    e.currentTarget.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#667eea';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                            >
                                {action.title || 'Untitled Action'} →
                            </a>
                        ) : (
                            <div
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {action.title || 'Untitled Action'}
                            </div>
                        )}

                        {/* Metadata */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem',
                                color: '#666',
                            }}
                        >
              <span
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                  }}
              >
                📅 {formatDate(action.date)}
              </span>
                            {action.source_type && (
                                <span
                                    style={{
                                        background: '#e5e7eb',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                    }}
                                >
                  {action.source_type}
                </span>
                            )}
                        </div>

                        {/* Summary */}
                        {action.summary && (
                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    color: '#555',
                                    margin: '0.5rem 0',
                                    lineHeight: '1.5',
                                }}
                            >
                                {truncateSummary(action.summary)}
                            </p>
                        )}

                        {/* Tags */}
                        {action.tags && action.tags.length > 0 && (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.35rem',
                                    flexWrap: 'wrap',
                                    marginTop: '0.5rem',
                                }}
                            >
                                {action.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.6rem',
                                            background: '#e0e7ff',
                                            color: '#667eea',
                                            borderRadius: '12px',
                                            fontWeight: '500',
                                        }}
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}