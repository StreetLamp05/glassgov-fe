'use client';

import { TopCategory, CategoryKey } from '@/lib/types';
import { getCategoryIcon, getCategoryLabel } from '@/lib/constants';
import GlassCard from '@/components/ui/GlassCard';

interface TopCategoriesProps {
    topCategories: TopCategory[];
    onCategoryClick?: (category: CategoryKey) => void;
}

export default function TopCategories({
                                          topCategories,
                                          onCategoryClick,
                                      }: TopCategoriesProps) {
    if (!topCategories || topCategories.length === 0) {
        return null;
    }

    // Limit to top 3
    const displayCategories = topCategories.slice(0, 3);

    return (
        <div
            style={{
                marginBottom: '2rem',
                textAlign: 'center',
            }}
        >
            <h3
                style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                Top in your area
            </h3>

            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                {displayCategories.map((tc, index) => {
                    const icon = getCategoryIcon(tc.label);
                    const label = getCategoryLabel(tc.label);

                    return (
                        <GlassCard
                            key={tc.label}
                            variant="dark"
                            padding="sm"
                            hover={!!onCategoryClick}
                            onClick={onCategoryClick ? () => onCategoryClick(tc.label) : undefined}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                minWidth: '180px',
                                cursor: onCategoryClick ? 'pointer' : 'default',
                                animation: `fadeInUp 0.4s ease-out ${index * 0.1}s backwards`,
                            }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    fontSize: '1.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    borderRadius: '12px',
                                }}
                            >
                                {icon}
                            </div>

                            {/* Label and Count */}
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <div
                                    style={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        marginBottom: '0.15rem',
                                    }}
                                >
                                    {label}
                                </div>
                                <div
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    {tc.count} {tc.count === 1 ? 'item' : 'items'}
                                </div>
                            </div>

                            {/* Count Badge */}
                            <div
                                style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    minWidth: '40px',
                                    textAlign: 'center',
                                }}
                            >
                                {tc.count}
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}