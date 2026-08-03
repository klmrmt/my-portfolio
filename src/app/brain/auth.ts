import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const BRAIN_COOKIE = "brain_session";

const DAY = 60 * 60 * 24;
const REMEMBERED_DEVICE_DAYS = 30;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  const secret = process.env.BRAIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function signatureFor(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function brainAuthIsConfigured() {
  return Boolean(process.env.BRAIN_PASSWORD && sessionSecret());
}

export function verifyBrainPassword(candidate: string) {
  const password = process.env.BRAIN_PASSWORD;
  return Boolean(password && safeEqual(candidate, password));
}

export function createBrainSession(rememberDevice: boolean) {
  const secret = sessionSecret();
  if (!secret) return null;

  const lifetime = rememberDevice ? DAY * REMEMBERED_DEVICE_DAYS : DAY;
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + lifetime * 1000, version: 1 }),
  ).toString("base64url");

  return {
    value: `${payload}.${signatureFor(payload, secret)}`,
    maxAge: rememberDevice ? lifetime : undefined,
  };
}

export async function hasValidBrainSession() {
  const secret = sessionSecret();
  if (!secret) return false;

  const value = (await cookies()).get(BRAIN_COOKIE)?.value;
  if (!value) return false;

  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra) return false;
  if (!safeEqual(signature, signatureFor(payload, secret))) return false;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { expiresAt?: number; version?: number };

    return (
      session.version === 1 &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}

