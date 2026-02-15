import { createClient } from "@sanity/client";
import "server-only";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

// Write-capable client for server-side use only
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
