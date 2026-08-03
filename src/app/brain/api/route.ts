import { NextRequest, NextResponse } from "next/server";
import {
  BRAIN_COOKIE,
  brainAuthIsConfigured,
  createBrainSession,
  verifyBrainPassword,
} from "../auth";

function redirectToBrain(request: NextRequest, error?: string) {
  const target = new URL("/brain", request.url);
  if (error) target.searchParams.set("error", error);
  return NextResponse.redirect(target, 303);
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const intent = String(form.get("intent") ?? "unlock");

  if (intent === "lock") {
    const response = redirectToBrain(request);
    response.cookies.set(BRAIN_COOKIE, "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/brain",
    });
    return response;
  }

  if (!brainAuthIsConfigured()) {
    return redirectToBrain(request, "configuration");
  }

  const password = String(form.get("password") ?? "");
  const rememberDevice = form.get("remember") === "on";

  if (!verifyBrainPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return redirectToBrain(request, "password");
  }

  const session = createBrainSession(rememberDevice);
  if (!session) return redirectToBrain(request, "configuration");

  const response = redirectToBrain(request);
  response.cookies.set(BRAIN_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/brain",
    maxAge: session.maxAge,
  });
  return response;
}

