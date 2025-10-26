'use client';

import { useEffect, useRef, useState } from 'react';
import { Geo } from '@/lib/types';
import { parsePlaceToGeo } from '@/lib/api';
import { GOOGLE_PLACES_CONFIG } from '@/lib/constants';

interface LocationInputProps {
    value: string;
    onChange: (location: string, geo: Geo) => void;
    placeholder?: string;
}

export default function LocationInput({
                                          value,
                                          onChange,
                                          placeholder = 'Enter your city, county, or state...',
                                      }: LocationInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        // Load Google Places API script
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_CONFIG.API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setIsLoaded(true);
                console.log('Google Places API loaded successfully');
            };
            script.onerror = () => {
                setError('Failed to load Google Places API');
            };
            document.head.appendChild(script);
        } else {
            setIsLoaded(true);
            console.log('Google Places API already loaded');
        }
    }, []);

    useEffect(() => {
        console.log('Google API loaded?', !!window.google);
        console.log('API key:', GOOGLE_PLACES_CONFIG.API_KEY);
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

        // Initialize Google Places Autocomplete
        try {
            const autocomplete = new google.maps.places.Autocomplete(
                inputRef.current,
                GOOGLE_PLACES_CONFIG.OPTIONS
            );

            // Set fields to return (minimize billing)
            autocomplete.setFields(['address_components', 'formatted_address']);

            // Listen for place selection
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                console.log('Place selected:', place);
                console.log('Address components:', place.address_components);

                if (!place.address_components) {
                    setError('Please select a location from the dropdown');
                    return;
                }

                // Parse the place into our Geo format
                const parsed = parsePlaceToGeo(place);
                console.log('Parsed geo:', parsed);

                // Create display string
                const displayParts = [
                    parsed.city,
                    parsed.county,
                    parsed.state_name,
                ].filter(Boolean);

                const displayString = displayParts.join(', ');
                console.log('Display string:', displayString);

                const geoObject = {
                    city: parsed.city,
                    county: parsed.county,
                    state_name: parsed.state_name,
                };
                console.log('Geo object:', geoObject);

                // Update local value
                setLocalValue(displayString);

                // Update parent with location and geo data
                onChange(displayString, geoObject);

                setError('');
            });

            autocompleteRef.current = autocomplete;
        } catch (err) {
            setError('Failed to initialize location search');
            console.error('Google Places Autocomplete error:', err);
        }

        return () => {
            if (autocompleteRef.current) {
                google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [isLoaded, onChange]);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

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
                Location <span style={{ color: '#667eea' }}>*</span>
            </label>

            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => {
                    // Only update local display value when typing
                    // Don't clear the geo until a new place is selected
                    setLocalValue(e.target.value);
                }}
                disabled={!isLoaded}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: error ? '2px solid #f87171' : '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)',
                }}
                onFocus={(e) => {
                    if (!error) {
                        e.target.style.borderColor = '#667eea';
                    }
                }}
                onBlur={(e) => {
                    if (!error) {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }
                }}
            />

            {error && (
                <p style={{
                    fontSize: '0.85rem',
                    color: '#f87171',
                    marginTop: '0.5rem',
                }}>
                    {error}
                </p>
            )}

            {!error && (
                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(0, 0, 0, 0.6)',
                    marginTop: '0.5rem',
                }}>
                    💡 Start typing and select from the dropdown
                </p>
            )}

            {!isLoaded && !error && (
                <p style={{
                    fontSize: '0.85rem',
                    color: '#667eea',
                    marginTop: '0.5rem',
                }}>
                    Loading location search...
                </p>
            )}
        </div>
    );
}