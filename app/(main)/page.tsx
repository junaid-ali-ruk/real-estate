import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { sanityFetch } from "@/lib/sanity/live";
import { FEATURED_PROPERTIES_QUERY } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Nestwell | Bespoke Architecture & Refined Living",
  description:
    "Experience the world's most distinctive luxury properties. Nestwell curates architectural legacies for those who view living as an art form.",
};

export default async function HomePage() {
  const { data: featuredProperties } = await sanityFetch({
    query: FEATURED_PROPERTIES_QUERY,
  });

  return <HomeClient featuredProperties={featuredProperties} />;
}
