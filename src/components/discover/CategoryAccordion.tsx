'use client';

import { useState } from 'react';
import { Section } from '@/lib/types';
import { getCategoryIcon, getCategoryLabel } from '@/lib/constants';
import GlassCard from '@/components/ui/GlassCard';
import GovernmentActions from './GovernmentActions';
import CitizenIssues from './CitizenIssues';

interface CategoryAccordionProps {
    section: Section;
    defaultExpanded?: boolean;
}

export default function CategoryAccordion({
                                              section,
                                              defaultExpanded = false,
                                          }: CategoryAccordionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const icon = getCategoryIcon(section.category);
    const label = getCategoryLabel(section.category);
    const totalItems = section.government_actions.length + section.citizen_issues.length;
    const isEmpty = totalItems === 0;

    return (
        <GlassCard variant="light" padding="none" style={{ overflow: 'hidden' }}>
            {/* Accordion Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#333',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Icon */}
                    <span
                        style={{
                            fontSize: '1.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                        }}
                    >
            {icon}
          </span>

                    {/* Label */}
                    <span>{label}</span>

                    {/* Count Badge */}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '16px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            minWidth: '45px',
                            textAlign: 'center',
                        }}
                    >
            {totalItems}
          </span>
                </div>

                {/* Expand/Collapse Arrow */}
                <span
                    style={{
                        fontSize: '1.5rem',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: '#667eea',
                    }}
                >
          ▼
        </span>
            </button>

            {/* Accordion Body */}
            {isExpanded && (
                <div
                    style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(10px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                        animation: 'slideDown 0.3s ease-out',
                    }}
                >
                    {isEmpty ? (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#666',
                                fontSize: '1rem',
                            }}
                        >
                            <p style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>🔍</p>
                            <p style={{ fontWeight: '500' }}>
                                Nothing recent for this category here.
                            </p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#999' }}>
                                Try another category or widen your search.
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    typeof window !== 'undefined' && window.innerWidth > 768
                                        ? '1fr 1fr'
                                        : '1fr',
                                gap: '2rem',
                            }}
                        >
                            {/* Government Actions Column */}
                            <div>
                                <GovernmentActions actions={section.government_actions} />
                            </div>

                            {/* Citizen Issues Column */}
                            <div>
                                <CitizenIssues issues={section.citizen_issues} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }
      `}</style>
        </GlassCard>
    );
}