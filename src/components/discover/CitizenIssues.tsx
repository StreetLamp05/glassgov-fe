'use client';

import { CitizenIssue } from '@/lib/types';
import { getCategoryLabel } from '@/lib/constants';

interface CitizenIssuesProps {
    issues: CitizenIssue[];
}

export default function CitizenIssues({ issues }: CitizenIssuesProps) {
    // Format date to readable string
    const formatDate = (isoString: string): string => {
        try {
            const date = new Date(isoString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            // Show relative time for recent issues
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

            // Otherwise show date
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        } catch {
            return 'Date unknown';
        }
    };

    if (issues.length === 0) {
        return (
            <div>
                <h4
                    style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#764ba2',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span>💬</span>
                    Citizen Issues
                </h4>
                <p
                    style={{
                        color: '#999',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        padding: '1rem',
                        background: 'rgba(118, 75, 162, 0.05)',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}
                >
                    No recent citizen issues
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
                    color: '#764ba2',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span>💬</span>
                Citizen Issues
                <span
                    style={{
                        background: '#764ba2',
                        color: 'white',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                    }}
                >
          {issues.length}
        </span>
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {issues.map((issue) => (
                    <li
                        key={issue.id}
                        style={{
                            marginBottom: '0.75rem',
                            padding: '1rem',
                            background: 'rgba(118, 75, 162, 0.05)',
                            borderRadius: '8px',
                            borderLeft: '3px solid #764ba2',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(118, 75, 162, 0.1)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(118, 75, 162, 0.05)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        {/* Title */}
                        <div
                            style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '0.5rem',
                                lineHeight: '1.4',
                            }}
                        >
                            {issue.title}
                        </div>

                        {/* Metadata */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.75rem',
                                alignItems: 'center',
                                fontSize: '0.85rem',
                            }}
                        >
                            {/* Score Badge */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    color: 'white',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                }}
                            >
                                <span>⬆️</span>
                                <span>{issue.score}</span>
                            </div>

                            {/* Date */}
                            <span
                                style={{
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                }}
                            >
                📅 {formatDate(issue.created_at)}
              </span>

                            {/* Category Badge */}
                            <span
                                style={{
                                    background: '#e5e7eb',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    color: '#555',
                                }}
                            >
                {getCategoryLabel(issue.primary_category)}
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}