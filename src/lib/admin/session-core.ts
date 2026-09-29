const TOKEN_VERSION = "v1";

export const ADMIN_SESSION_COOKIE = "kynta_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmacSha256Base64Url(
  message: string,
  secret: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );
  return toBase64Url(new Uint8Array(signature));
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function signedEquals(a: string, b: string): Promise<boolean> {
  const [digestA, digestB] = await Promise.all([sha256Hex(a), sha256Hex(b)]);
  return constantTimeEquals(digestA, digestB);
}

export function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.ADMIN_USER_ID &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET,
  );
}

export async function createAdminSessionToken(
  nowMs: number = Date.now(),
): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Admin session secret is not configured");
  }

  const expiresAt = Math.floor(nowMs / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS;
  const payload = `${TOKEN_VERSION}.${expiresAt}`;
  const signature = await hmacSha256Base64Url(
    `kynta-admin-session:${payload}`,
    secret,
  );
  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null,
  nowMs: number = Date.now(),
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [version, expiresAtRaw, signature] = parts;
  if (version !== TOKEN_VERSION || !/^\d{1,15}$/.test(expiresAtRaw)) {
    return false;
  }

  const expiresAtMs = Number(expiresAtRaw) * 1000;
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs) {
    return false;
  }

  const expected = await hmacSha256Base64Url(
    `kynta-admin-session:${version}.${expiresAtRaw}`,
    secret,
  );
  return signedEquals(expected, signature);
}

export async function verifyAdminCredentials(
  userId: string,
  password: string,
): Promise<boolean> {
  const expectedUserId = process.env.ADMIN_USER_ID;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUserId || !expectedPassword || !userId || !password) {
    return false;
  }

  const [userIdMatches, passwordMatches] = await Promise.all([
    signedEquals(expectedUserId, userId),
    signedEquals(expectedPassword, password),
  ]);
  return userIdMatches && passwordMatches;
}
