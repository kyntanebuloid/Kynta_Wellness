import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function getSimilarity(a: string, b: string): number {
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
  const maxLength = Math.max(a.length, b.length);
  return 1 - distance / maxLength;
}

const REAL_ROUTES = [
  "/",
  "/about",
  "/experiences",
  "/locations",
  "/blog",
  "/book",
  "/contact",
  "/for-hospitality",
  "/partner",
  "/privacy",
  "/terms",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ notfound: string[] }> },
) {
  const { notfound } = await params;
  const attemptedPath = "/" + (notfound?.join("/") || "");

  let closestRoute = "/";
  let highestSimilarity = 0;

  for (const route of REAL_ROUTES) {
    const similarity = getSimilarity(attemptedPath, route);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      closestRoute = route;
    }
  }

  if (highestSimilarity > 0.6) {
    redirect(closestRoute);
  } else {
    redirect("/");
  }
}
