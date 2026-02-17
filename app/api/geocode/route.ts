import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const types = searchParams.get("types") || "address";
  const limit = searchParams.get("limit") || (types === "address" ? "5" : "1");
  const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  if (!token) {
    logger.error("Mapbox token not configured on server");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  try {
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${token}&types=${types}&limit=${limit}&country=US`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mapbox API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    logger.error("Server-side geocoding failed", { error, address });
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
