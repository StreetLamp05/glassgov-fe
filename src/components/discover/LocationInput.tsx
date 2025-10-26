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
    const autocompleteRef = useRef<HTMLElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Load Google Places API script
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_CONFIG.API_KEY}&libraries=places&loading=async`;
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
        if (!isLoaded || autocompleteRef.current) return;

        try {
            // Create the new PlaceAutocompleteElement
            const autocomplete = document.createElement('gmp-place-autocomplete') as any;
            autocomplete.setAttribute('type', 'regions');
            autocomplete.setAttribute('placeholder', placeholder);

            // Add to DOM
            const container = document.getElementById('autocomplete-container');
            if (container) {
                container.appendChild(autocomplete);
                autocompleteRef.current = autocomplete;

                // Listen for place selection
                autocomplete.addEventListener('gmp-placeselect', async (event: any) => {
                    console.log('🎯 Place selected event fired!');
                    const place = event.detail.place;

                    if (!place) {
                        setError('Please select a location from the dropdown');
                        return;
                    }

                    // Fetch place details
                    await place.fetchFields({
                        fields: ['addressComponents', 'formattedAddress']
                    });

                    console.log('Place details:', place);

                    // Parse address components
                    const addressComponents = place.addressComponents || [];
                    const getComponent = (type: string): string | undefined => {
                        const component = addressComponents.find((c: any) =>
                            c.types.includes(type)
                        );
                        return component?.longText;
                    };

                    let city = getComponent('locality') || getComponent('postal_town');
                    let county = getComponent('administrative_area_level_2');
                    const state = getComponent('administrative_area_level_1');

                    // Append "County" if missing
                    if (county && !/county$/i.test(county)) {
                        county += ' County';
                    }

                    // Convert state code to full name if needed (simple version)
                    const state_name = state;

                    const geoObject = {
                        city,
                        county,
                        state_name,
                    };

                    console.log('Parsed geo:', geoObject);

                    // Create display string
                    const displayParts = [city, county, state_name].filter(Boolean);
                    const displayString = displayParts.join(', ');

                    console.log('Display string:', displayString);

                    // Update parent
                    onChange(displayString, geoObject);
                    setError('');
                });
            }
        } catch (err) {
            setError('Failed to initialize location search');
            console.error('Google Places Autocomplete error:', err);
        }
    }, [isLoaded, onChange, placeholder]);

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

            {/* Container for the autocomplete element */}
            <div
                id="autocomplete-container"
                style={{
                    width: '100%',
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

            <style jsx>{`
                gmp-place-autocomplete {
                    width: 100%;
                    padding: 0.75rem;
                    font-size: 1rem;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.2s;
                    background: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(5px);
                }
                gmp-place-autocomplete:focus {
                    border-color: #667eea;
                }
            `}</style>
        </div>
    );
}