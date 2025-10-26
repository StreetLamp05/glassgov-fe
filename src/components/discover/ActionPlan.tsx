'use client';

import { useState } from 'react';
import { ActionPlan } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

interface ActionPlanProps {
    actionPlan: ActionPlan;
}

export default function ActionPlanComponent({ actionPlan }: ActionPlanProps) {
    const [copiedCallScript, setCopiedCallScript] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const copyToClipboard = (text: string, type: 'call' | 'email') => {
        navigator.clipboard.writeText(text);
        if (type === 'call') {
            setCopiedCallScript(true);
            setTimeout(() => setCopiedCallScript(false), 2000);
        } else {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        }
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
                    <span style={{ fontSize: '1.8rem' }}>🎯</span>
                    Your Action Plan
                </h2>
                <p
                    style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                    }}
                >
                    Here's how you can make your voice heard
                </p>
            </div>

            {/* Overview */}
            <GlassCard variant="dark" padding="md" style={{ marginBottom: '1.5rem' }}>
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
            💪
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
                            Why This Matters
                        </h4>
                        <p
                            style={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                margin: 0,
                            }}
                        >
                            {actionPlan.overview}
                        </p>
                    </div>
                </div>
            </GlassCard>

            {/* Contacts */}
            {actionPlan.contacts.length > 0 && (
                <GlassCard variant="light" padding="lg" style={{ marginBottom: '1.5rem' }}>
                    <h3
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#667eea',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span>📞</span>
                        Who to Contact
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {actionPlan.contacts.map((contact, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(102, 126, 234, 0.08)',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid #667eea',
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: '700',
                                        fontSize: '1.05rem',
                                        color: '#333',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    {contact.name}
                                </div>
                                <div
                                    style={{
                                        color: '#667eea',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                    }}
                                >
                                    {contact.title}
                                </div>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        color: '#555',
                                    }}
                                >
                                    {contact.phone && (
                                        <div>
                                            <strong>Phone:</strong> {contact.phone}
                                        </div>
                                    )}
                                    {contact.email && (
                                        <div>
                                            <strong>Email:</strong>{' '}
                                            <a
                                                href={`mailto:${contact.email}`}
                                                style={{ color: '#667eea', textDecoration: 'none' }}
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                    )}
                                    {contact.officeHours && (
                                        <div>
                                            <strong>Hours:</strong> {contact.officeHours}
                                        </div>
                                    )}
                                    {contact.website && (
                                        <div>
                                            <strong>Website:</strong>{' '}
                                            <a
                                                href={contact.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#667eea', textDecoration: 'none' }}
                                            >
                                                Visit →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            )}

            {/* Two-column grid for scripts */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                }}
            >
                {/* Call Script */}
                <GlassCard variant="light" padding="lg">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: '#10b981',
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <span>📱</span>
                            Call Script
                        </h3>
                        <button
                            onClick={() => copyToClipboard(actionPlan.callScript, 'call')}
                            style={{
                                padding: '0.5rem 1rem',
                                background: copiedCallScript ? '#10b981' : '#10b98120',
                                color: copiedCallScript ? 'white' : '#10b981',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {copiedCallScript ? '✓ Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div
                        style={{
                            padding: '1rem',
                            background: 'rgba(16, 185, 129, 0.05)',
                            borderRadius: '8px',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            color: '#333',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {actionPlan.callScript}
                    </div>
                </GlassCard>

                {/* Email Template */}
                <GlassCard variant="light" padding="lg">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: '#3b82f6',
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <span>✉️</span>
                            Email Template
                        </h3>
                        <button
                            onClick={() => copyToClipboard(actionPlan.emailTemplate, 'email')}
                            style={{
                                padding: '0.5rem 1rem',
                                background: copiedEmail ? '#3b82f6' : '#3b82f620',
                                color: copiedEmail ? 'white' : '#3b82f6',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {copiedEmail ? '✓ Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div
                        style={{
                            padding: '1rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '8px',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            color: '#333',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {actionPlan.emailTemplate}
                    </div>
                </GlassCard>
            </div>

            {/* Tips */}
            {actionPlan.tips.length > 0 && (
                <GlassCard variant="light" padding="lg" style={{ marginBottom: '1.5rem' }}>
                    <h3
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#f59e0b',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span>💡</span>
                        Tips for Effective Communication
                    </h3>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                        }}
                    >
                        {actionPlan.tips.map((tip, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: 'rgba(245, 158, 11, 0.08)',
                                    borderRadius: '8px',
                                    borderLeft: '3px solid #f59e0b',
                                }}
                            >
                <span
                    style={{
                        fontSize: '1rem',
                        color: '#f59e0b',
                        fontWeight: '700',
                        minWidth: '20px',
                    }}
                >
                  {index + 1}.
                </span>
                                <span
                                    style={{
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        color: '#555',
                                    }}
                                >
                  {tip}
                </span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            )}

            {/* Next Steps */}
            {actionPlan.nextSteps.length > 0 && (
                <GlassCard variant="dark" padding="md">
                    <h3
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span>🚀</span>
                        Additional Actions You Can Take
                    </h3>
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
                        {actionPlan.nextSteps.map((step, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5',
                                }}
                            >
                                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>▸</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            )}
        </div>
    );
}