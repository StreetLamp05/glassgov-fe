'use client';

import { useState } from 'react';
import { CategoryKey, Geo, TopCategory } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import LocationInput from './LocationInput';
import MessageInput from './MessageInput';
import CategoryChips from './CategoryChips';

interface SearchFormProps {
    onSubmit: (params: {
        geo: Geo;
        message?: string;
        categories?: CategoryKey[];
    }) => void;
    loading: boolean;
    error?: string;
    topCategories?: TopCategory[];
    initialLocation?: string;
    initialGeo?: Geo;
    initialMessage?: string;
    initialCategories?: CategoryKey[];
}

export default function SearchForm({
                                       onSubmit,
                                       loading,
                                       error,
                                       topCategories,
                                       initialLocation = '',
                                       initialGeo = {},
                                       initialMessage = '',
                                       initialCategories = [],
                                   }: SearchFormProps) {
    const [location, setLocation] = useState(initialLocation);
    const [geo, setGeo] = useState<Geo>(initialGeo);
    const [message, setMessage] = useState(initialMessage);
    const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(initialCategories);

    const canSubmit = !loading && (geo.city || geo.county || geo.state_name);


    //TODO: REMOVE
    console.log('SearchForm - geo:', geo);
    console.log('SearchForm - canSubmit:', canSubmit);
    console.log('SearchForm - geo has values:', geo.city || geo.county || geo.state_name);

    const handleLocationChange = (newLocation: string, newGeo: Geo) => {
        setLocation(newLocation);
        setGeo(newGeo);
    };

    const handleCategoryToggle = (category: CategoryKey) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        onSubmit({
            geo,
            message: message.trim() || undefined,
            categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        });
    };

    return (
        <GlassCard variant="light" padding="lg">
            <form onSubmit={handleSubmit}>
                <LocationInput
                    value={location}
                    onChange={handleLocationChange}
                />

                <MessageInput
                    value={message}
                    onChange={setMessage}
                />

                <CategoryChips
                    selectedCategories={selectedCategories}
                    onToggle={handleCategoryToggle}
                    topCategories={topCategories}
                />

                <button
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'white',
                        background: canSubmit
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'rgba(200, 200, 200, 0.5)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: canSubmit ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        boxShadow: canSubmit
                            ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                            : 'none',
                    }}
                    onMouseEnter={(e) => {
                        if (canSubmit) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (canSubmit) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                        }
                    }}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span
                  style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                  }}
              />
              Searching...
            </span>
                    ) : (
                        '🔍 Discover'
                    )}
                </button>

                {error && (
                    <div
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(248, 113, 113, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(248, 113, 113, 0.3)',
                            borderRadius: '8px',
                            color: '#dc2626',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}
            </form>

            <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </GlassCard>
    );
}