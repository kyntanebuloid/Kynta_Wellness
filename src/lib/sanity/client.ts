import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-01-01";

export function sanityClient() {
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}

export function sanityNoCdnClient() {
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}

export function sanityPreviewClient() {
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN for preview client");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "previewDrafts",
    token,
  });
}
