'use client';

import GlassCard from '@/components/ui/GlassCard';

interface LoadingStateProps {
    message?: string;
}

export default function LoadingState({
                                         message = 'Searching for relevant information...',
                                     }: LoadingStateProps) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            {/* Animated spinner */}
            <div
                style={{
                    display: 'inline-block',
                    width: '60px',
                    height: '60px',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '4px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1.5rem',
                }}
            />

            {/* Loading message */}
            <p
                style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    marginBottom: '2rem',
                }}
            >
                {message}
            </p>

            {/* Skeleton cards */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                {[1, 2, 3].map((i) => (
                    <GlassCard key={i} variant="medium" padding="md">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            {/* Icon skeleton */}
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                                }}
                            />
                            {/* Title skeleton */}
                            <div
                                style={{
                                    flex: 1,
                                    height: '24px',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                                }}
                            />
                            {/* Badge skeleton */}
                            <div
                                style={{
                                    width: '50px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                                }}
                            />
                        </div>

                        {/* Content skeletons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div
                                style={{
                                    height: '16px',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2 + 0.1}s infinite`,
                                }}
                            />
                            <div
                                style={{
                                    height: '16px',
                                    width: '80%',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                                    animation: `pulse 1.5s ease-in-out ${i * 0.2 + 0.2}s infinite`,
                                }}
                            />
                        </div>
                    </GlassCard>
                ))}
            </div>

            <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    );
}