'use client';

interface MessageInputProps {
    value: string;
    onChange: (message: string) => void;
    placeholder?: string;
}

export default function MessageInput({
                                         value,
                                         onChange,
                                         placeholder = "e.g., 'Potholes on Main St', 'No grocery stores nearby', 'Crime increasing'...",
                                     }: MessageInputProps) {
    const charCount = value.length;
    const maxChars = 500;

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label
                style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#333',
                }}
            >
                Describe your concern{' '}
                <span style={{ fontWeight: '400', color: '#666' }}>(optional)</span>
            </label>

            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    if (e.target.value.length <= maxChars) {
                        onChange(e.target.value);
                    }
                }}
                rows={4}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)',
                    minHeight: '100px',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                }}
            >
                <p
                    style={{
                        fontSize: '0.85rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        margin: 0,
                    }}
                >
                    💬 We'll match your concern to relevant government actions
                </p>
                <p
                    style={{
                        fontSize: '0.85rem',
                        color: charCount > maxChars * 0.9 ? '#f87171' : 'rgba(0, 0, 0, 0.5)',
                        margin: 0,
                        fontWeight: '500',
                    }}
                >
                    {charCount}/{maxChars}
                </p>
            </div>
        </div>
    );
}