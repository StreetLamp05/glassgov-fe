import { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    variant?: 'light' | 'medium' | 'dark';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export default function GlassCard({
                                      children,
                                      className = '',
                                      style = {},
                                      variant = 'medium',
                                      hover = false,
                                      padding = 'md',
                                      onClick,
                                  }: GlassCardProps) {
    const variants = {
        light: {
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
        medium: {
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
        dark: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
    };

    const paddings = {
        none: '0',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
    };

    const baseStyle: CSSProperties = {
        ...variants[variant],
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: paddings[padding],
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
    };

    const hoverStyle: CSSProperties = hover
        ? {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        }
        : {};

    return (
        <div
            className={className}
            style={baseStyle}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (hover && onClick) {
                    Object.assign(e.currentTarget.style, hoverStyle);
                }
            }}
            onMouseLeave={(e) => {
                if (hover && onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = baseStyle.boxShadow as string;
                }
            }}
        >
            {children}
        </div>
    );
}