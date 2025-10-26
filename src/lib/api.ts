import { DiscoverRequest, DiscoverResponse } from './types';
import { API_CONFIG } from './constants';

/**
 * Fetch wrapper for the Discover API endpoint
 * @param req - The discover request payload
 * @param signal - Optional AbortSignal for cancellation
 * @returns Promise with the discover response
 * @throws Error if the request fails
 */
export async function fetchDiscover(
    req: DiscoverRequest,
    signal?: AbortSignal
): Promise<DiscoverResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.DISCOVER_ENDPOINT}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
            signal,
        });

        // Handle non-JSON responses gracefully
        const text = await res.text();
        let data: any;

        try {
            data = text ? JSON.parse(text) : {};
        } catch (parseError) {
            throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
        }

        // Handle HTTP errors
        if (!res.ok) {
            const errorMessage = data?.error || res.statusText || 'Unknown error';
            throw new Error(errorMessage);
        }

        return data as DiscoverResponse;
    } catch (error: any) {
        // Don't throw on abort - let the caller handle it
        if (error.name === 'AbortError') {
            throw error;
        }

        // Network or other errors
        if (error.message) {
            throw error;
        }

        throw new Error('Failed to connect to the server. Please try again.');
    }
}

/**
 * Helper to check if the backend is reachable
 * @returns Promise<boolean>
 */
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${API_CONFIG.BASE_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        return res.ok;
    } catch {
        return false;
    }
}

/**
 * Parse a Google Places result into our Geo format
 * @param place - Google Places PlaceResult
 * @returns Geo object
 */
export function parsePlaceToGeo(place: google.maps.places.PlaceResult): {
    city?: string;
    county?: string;
    state_name?: string;
    formatted_address?: string;
} {
    const components = place.address_components || [];

    const getComponent = (type: string): string | undefined => {
        const component = components.find(c => c.types.includes(type));
        return component?.long_name;
    };

    let city = getComponent('locality') || getComponent('postal_town');
    let county = getComponent('administrative_area_level_2');
    const state = getComponent('administrative_area_level_1');

    // Append "County" if missing
    if (county && !/county$/i.test(county)) {
        county += ' County';
    }

    // Convert state code to full name if needed
    const state_name = state && state.length === 2
        ? codeToStateFull(state)
        : state;

    return {
        city,
        county,
        state_name,
        formatted_address: place.formatted_address,
    };
}

/**
 * Convert US state code to full state name
 * @param code - Two-letter state code (e.g., "CA")
 * @returns Full state name (e.g., "California")
 */
function codeToStateFull(code: string): string {
    const stateMap: Record<string, string> = {
        AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
        CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
        FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
        IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
        KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
        MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
        MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
        NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
        NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
        OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
        SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
        VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
        WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia',
    };

    return stateMap[code.toUpperCase()] || code;
}