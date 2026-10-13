import "server-only";
export async function verifyCaptchaServer(token: string, ip?: string | null): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.error("Falta TURNSTILE_SECRET_KEY");
        return false;
    }
    if (!token) return false;
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);
    try {
        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body, // fetch pone el Content-Type correcto
            cache: "no-store",
        });
        if (!res.ok) return false;
        const data: { success: boolean } = await res.json();
        return data.success === true;
    } catch (error) {
        console.error(new Error("Error verificando Turnstile", { cause: error }));
        return false;
    }
}