/**
 * API Service for communicating with Django backend
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string | null;
    location: string;
    event_type: string;
    attendees: number;
    registration_deadline: string | null;
    speakers: string | null;
    speakers_list: string[];
    banner_image: string | null;
    banner_image_url: string | null;
    is_featured: boolean;
    is_upcoming: boolean;
    created_at: string;
    updated_at: string;
}

export interface EventsResponse {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Event[];
}

/**
 * Fetch all events
 */
export async function fetchEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/events/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
        console.error('fetchEvents error:', error);
        throw error;
    }
}

/**
 * Fetch upcoming events
 */
export async function fetchUpcomingEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/events/upcoming/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
        console.error('fetchUpcomingEvents error:', error);
        throw error;
    }
}

/**
 * Fetch past events
 */
export async function fetchPastEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/events/past/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
        console.error('fetchPastEvents error:', error);
        throw error;
    }
}

/**
 * Fetch featured events
 */
export async function fetchFeaturedEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/events/featured/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
        console.error('fetchFeaturedEvents error:', error);
        throw error;
    }
}

/**
 * Fetch a single event by ID
 */
export async function fetchEventById(id: number): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch event');
    }
    return response.json();
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
