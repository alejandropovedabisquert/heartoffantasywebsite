"use server";

import { cookies } from "next/headers";

export async function setCookieAction({
    name,
    data,
    maxAge = 31536000, // Por defecto 1 año
}: {
    name: string,
    data: string,
    maxAge?: number
}) {
    const cookieStore = await cookies();
    cookieStore.set(name , data, {
        path: "/",
        maxAge: maxAge,
    });
}
export async function getCookieAction({
    name
}: {
    name: string,
}) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value;
}

export async function hasCookieAction({
    name
}: {
    name: string,
}) {
    const cookieStore = await cookies();
    const cookie = cookieStore.has(name);
    return cookie;
}

export async function removeCookieAction({
    name
}: {
    name: string,
}) {
    const cookieStore = await cookies();
    const cookie = cookieStore.delete(name);
    return cookie;
}