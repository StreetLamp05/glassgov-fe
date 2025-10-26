'use client';

import { CategoryKey, TopCategory } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

interface CategoryChipsProps {
    selectedCategories: CategoryKey[];
    onToggle: (category: CategoryKey) => void;
    topCategories?: TopCategory[];
}

export default function CategoryChips({
                                          selectedCategories,
                                          onToggle,
                                          topCategories,
                                      }: CategoryChipsProps) {
    // Helper to get count for a category from top categories
    const getCategoryCount = (key: CategoryKey): number | undefined => {
        return topCategories?.find(tc => tc.label === key)?.count;
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label
                style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#333',
                }}
            >
                Or select categories{' '}
                <span style={{ fontWeight: '400', color: '#666' }}>(optional)</span>
            </label>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                }}
            >
                {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.key);
                    const count = getCategoryCount(cat.key);

                    return (
                        <button
                            key={cat.key}
                            onClick={() => onToggle(cat.key)}
                            style={{
                                padding: '0.65rem 1.1rem',
                                borderRadius: '20px',
                                border: isSelected
                                    ? '2px solid #667eea'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                background: isSelected
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    : 'rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                color: isSelected ? 'white' : '#333',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: isSelected
                                    ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                                    : 'none',
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    e.currentTarget.style.borderColor = '#667eea';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                            <span>{cat.label}</span>
                            {count !== undefined && (
                                <span
                                    style={{
                                        background: isSelected
                                            ? 'rgba(255, 255, 255, 0.3)'
                                            : 'rgba(102, 126, 234, 0.2)',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '10px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        color: isSelected ? 'white' : '#667eea',
                                    }}
                                >
                  {count}
                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedCategories.length > 0 && (
                <div
                    style={{
                        marginTop: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
          <span
              style={{
                  fontSize: '0.85rem',
                  color: '#667eea',
                  fontWeight: '500',
              }}
          >
            {selectedCategories.length} selected
          </span>
                    <button
                        onClick={() => selectedCategories.forEach(cat => onToggle(cat))}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#f87171',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            padding: 0,
                        }}
                    >
                        Clear all
                    </button>
                </div>
            )}

            <p
                style={{
                    fontSize: '0.85rem',
                    color: 'rgba(0, 0, 0, 0.6)',
                    marginTop: '0.5rem',
                }}
            >
                🎯 Select categories to filter results, or leave empty to see top issues
            </p>
        </div>
    );
}