'use server'

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const verifyTurnstile = async (token: string): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const outcome = await response.json() as { success: boolean };
    return outcome.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
};