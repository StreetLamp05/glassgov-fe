'use client';

import { useEffect } from 'react';

interface IntroScreenProps {
    onDismiss: () => void;
}

export default function IntroScreen({ onDismiss }: IntroScreenProps) {
    useEffect(() => {
        const handleKeyDown = () => {
            onDismiss();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onDismiss]);

    return (
        <>
            <style jsx>{`
                .intro-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    cursor: pointer;
                }

                .logo-container {
                    margin-bottom: 3rem;
                }

                .logo {
                    font-size: 4rem;
                    font-weight: 700;
                    color: white;
                    letter-spacing: -2px;
                    animation: fadeInScale 0.8s ease forwards;
                }

                .tagline-container {
                    height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 4rem;
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                }

                .tagline {
                    font-size: 1.5rem;
                    color: rgba(255, 255, 255, 0.95);
                    text-align: center;
                    font-weight: 300;
                    letter-spacing: 0.5px;
                    opacity: 0;
                    position: absolute;
                    animation: cycleTagline 12s infinite;
                    white-space: pre-line;
                    line-height: 1.6;
                    max-width: 100%;
                }

                .tagline:nth-child(1) {
                    animation-delay: 0s;
                }

                .tagline:nth-child(2) {
                    animation-delay: 3s;
                }

                .tagline:nth-child(3) {
                    animation-delay: 6s;
                }

                .tagline:nth-child(4) {
                    animation-delay: 9s;
                }

                .continue-button {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 12px 32px;
                    border-radius: 30px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: floatButton 3s ease-in-out infinite;
                }

                .continue-button:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }

                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes cycleTagline {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    8% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    25% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    33% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }

                @keyframes floatButton {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                @media (max-width: 768px) {
                    .logo {
                        font-size: 3rem;
                    }

                    .tagline {
                        font-size: 1.2rem;
                        padding: 0 2rem;
                        white-space: normal;
                    }

                    .tagline-container {
                        height: 100px;
                    }

                    .continue-button {
                        padding: 10px 28px;
                        font-size: 0.9rem;
                    }
                }
            `}</style>

            <div className="intro-screen" onClick={onDismiss}>
                <div className="logo-container">
                    <div className="logo">GlassGov</div>
                </div>
                <div className="tagline-container">
                    <div className="tagline">{"See through government.\nTake action."}</div>
                    <div className="tagline">{"Transparency.\nAction.\nChange."}</div>
                    <div className="tagline">Your city, decoded.</div>
                    <div className="tagline">{"From city hall\nto your call."}</div>
                </div>
                <button className="continue-button">
                    Click to continue
                </button>
            </div>
        </>
    );
}