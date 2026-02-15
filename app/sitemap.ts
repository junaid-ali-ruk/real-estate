import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Fetch all active properties
    const properties = await client.fetch<{ _id: string; slug: { current: string }; updatedAt: string }[]>(
        `*[_type == "property" && status == "active"] { 
            _id, 
            slug, 
            "updatedAt": _updatedAt 
        }`
    );

    const propertyUrls = properties.map((property) => ({
        url: `${baseUrl}/properties/${property._id}`,
        lastModified: new Date(property.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/properties`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        ...propertyUrls,
    ];
}
