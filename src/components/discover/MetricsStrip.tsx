'use client';

import { Geo } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

interface MetricsStripProps {
    geo: Geo;
    totalItems: number;
}

export default function MetricsStrip({ geo, totalItems }: MetricsStripProps) {
    // Format location display
    const locationParts = [geo.city, geo.county, geo.state_name].filter(Boolean);
    const locationDisplay = locationParts.join(', ');

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem',
            }}
        >
            {/* Location Card */}
            <GlassCard
                variant="dark"
                padding="sm"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    minWidth: '200px',
                }}
            >
                <div
                    style={{
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                    }}
                >
                    📍
                </div>
                <div>
                    <div
                        style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '0.15rem',
                        }}
                    >
                        Location
                    </div>
                    <div
                        style={{
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                        }}
                    >
                        {locationDisplay || 'Not specified'}
                    </div>
                </div>
            </GlassCard>

            {/* Items Found Card */}
            <GlassCard
                variant="dark"
                padding="sm"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    minWidth: '180px',
                }}
            >
                <div
                    style={{
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                    }}
                >
                    📊
                </div>
                <div>
                    <div
                        style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '0.15rem',
                        }}
                    >
                        Items Found
                    </div>
                    <div
                        style={{
                            color: 'white',
                            fontSize: '1.3rem',
                            fontWeight: '700',
                        }}
                    >
                        {totalItems}
                    </div>
                </div>
            </GlassCard>

            {/* Status Indicator Card */}
            <GlassCard
                variant="dark"
                padding="sm"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    minWidth: '160px',
                }}
            >
                <div
                    style={{
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(102, 234, 152, 0.2)',
                        borderRadius: '50%',
                    }}
                >
                    ✓
                </div>
                <div>
                    <div
                        style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '0.15rem',
                        }}
                    >
                        Status
                    </div>
                    <div
                        style={{
                            color: '#66ea98',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                        }}
                    >
                        Live Data
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}