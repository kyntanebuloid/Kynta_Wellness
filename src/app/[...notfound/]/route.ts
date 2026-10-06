import { redirect } from "next/navigation";

// Levenshtein distance: how many edits needed to match strings
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

// Calculate similarity score (0-1, where 1 is identical)
function getSimilarity(a: string, b: string): number {
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
  const maxLength = Math.max(a.length, b.length);
  return 1 - distance / maxLength;
}

// Real routes in the app
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
  request: Request,
  { params }: { params: Promise<{ notfound: string[] }> },
) {
  const { notfound } = await params;
  const attemptedPath = "/" + (notfound?.join("/") || "");

  // Find the closest matching real route
  let closestRoute = "/";
  let highestSimilarity = 0;

  for (const route of REAL_ROUTES) {
    const similarity = getSimilarity(attemptedPath, route);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      closestRoute = route;
    }
  }

  // Redirect to closest match if similarity is above 60%
  // Otherwise redirect to home
  if (highestSimilarity > 0.6) {
    redirect(closestRoute);
  } else {
    redirect("/");
  }
}
