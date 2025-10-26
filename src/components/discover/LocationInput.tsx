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
        setLocalValue(value);
    }, [value]);

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
        if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

        try {
            // Initialize Google Places Autocomplete (old API - still works!)
            const autocomplete = new google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ['(regions)'],
                    componentRestrictions: { country: 'us' },
                }
            );

            // Set fields to return
            autocomplete.setFields(['address_components', 'formatted_address']);

            console.log('Autocomplete initialized');

            // Listen for place selection
            autocomplete.addListener('place_changed', () => {
                console.log('🎯 PLACE_CHANGED EVENT FIRED!');
                const place = autocomplete.getPlace();

                console.log('Place object:', place);

                if (!place.address_components) {
                    console.log('No address components');
                    setError('Please select a location from the dropdown');
                    return;
                }

                console.log('Address components:', place.address_components);

                // Parse using the existing function
                const parsed = parsePlaceToGeo(place);
                console.log('Parsed result:', parsed);

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

                console.log('✅ Final geo object:', geoObject);

                // Update local value
                setLocalValue(displayString);

                // Update parent
                console.log('🚀 Calling onChange');
                onChange(displayString, geoObject);
                setError('');
            });

            autocompleteRef.current = autocomplete;
            console.log('Event listener attached');
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