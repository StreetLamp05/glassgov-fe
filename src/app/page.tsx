'use client';

import { useState, useEffect } from 'react';
import IntroScreen from '@/components/IntroScreen';

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        // Only show intro after client-side mount to prevent hydration issues
        setShowIntro(true);
    }, []);

    return (
        <>
            {showIntro && <IntroScreen onDismiss={() => setShowIntro(false)} />}

            <main style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f7fa',
                padding: '2rem'
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '1200px',
                    padding: '3rem'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        color: '#667eea',
                        marginBottom: '1rem',
                        fontWeight: '700'
                    }}>
                        Welcome to GlassGov
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        lineHeight: '1.8'
                    }}>
                        Transparency in government. Action for your community.
                    </p>

                    {/* Add your actual content here */}
                </div>
            </main>
        </>
    );
}