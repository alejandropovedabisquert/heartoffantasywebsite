"use server";

import { verifyCaptchaServer } from "../server/captcha";

export async function verifyCaptcha(token: string): Promise<boolean> {
  return verifyCaptchaServer(token);
}