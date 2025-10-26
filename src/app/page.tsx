'use client';

import { useState, useEffect } from 'react';
import IntroScreen from '@/components/IntroScreen';
import DiscoverSection from '@/components/discover/DiscoverSection';
import { STORAGE_KEYS } from '@/lib/constants';
import Image from "next/image";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        // Only show intro after client-side mount to prevent hydration issues
        const hasSeenIntro = localStorage.getItem(STORAGE_KEYS.INTRO_SEEN);
        if (!hasSeenIntro) {
            setShowIntro(true);
        }
    }, []);

    const handleDismissIntro = () => {
        setShowIntro(false);
        localStorage.setItem(STORAGE_KEYS.INTRO_SEEN, 'true');
    };

    return (
        <>
            {showIntro && <IntroScreen onDismiss={handleDismissIntro} />}

            <main
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            >
                <DiscoverSection />
            </main>
        </>
    );
}