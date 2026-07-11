"use server";

import { verify } from "hcaptcha";

const secretKey = process.env.SECRET_CAPTCHA;

export const verifyCaptcha = async (token: string) => {
  try {
    const { success } = await verify(secretKey || "", token);
    return success;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error al obtener los datos", error);
    }
    return false;
  }
};
