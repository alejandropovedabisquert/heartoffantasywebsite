"use server";
const secretKey = process.env.TURNSTILE_SECRET_KEY;

export const verifyCaptcha = async (token: string) => {
  if (!secretKey) {
    console.error("Falta la clave secreta de Turnstile");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error al obtener los datos de validación", error);
    }
    return false;
  }
};