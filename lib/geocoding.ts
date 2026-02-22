/**
 * Geocoding utility using Mapbox Geocoding API
 * Converts addresses to coordinates (lat/lng)
 */

import type { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";
import { logger } from "@/lib/logger";

export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface GeocodingError {
  message: string;
  code: "NO_RESULTS" | "API_ERROR" | "INVALID_TOKEN" | "NETWORK_ERROR";
}

/**
 * Geocode an address to coordinates using Mapbox
 * @param address - Full address string to geocode
 * @returns Promise with coordinates or null if not found
 */
export async function geocodeAddress(
  address: string,
): Promise<GeocodingResult | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    logger.error("Mapbox token not configured");
    return null;
  }

  if (!address || address.trim().length < 3) {
    return null;
  }

  const encodedAddress = encodeURIComponent(address.trim());
  const url = `/api/geocode?address=${encodedAddress}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      logger.error("Internal geocoding API error", { status: response.status });
      return null;
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature: GeocodeFeature = data.features[0];
    const [lng, lat] = feature.center;

    return {
      lat,
      lng,
      formattedAddress: feature.place_name,
    };
  } catch (error) {
    logger.error("Geocoding error", { error, address: encodedAddress });
    return null;
  }
}

/**
 * Build a full address string from address components
 */
export function buildAddressString(components: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): string {
  const parts = [
    components.street,
    components.city,
    components.state,
    components.zipCode,
  ].filter(Boolean);

  return parts.join(", ");
}
