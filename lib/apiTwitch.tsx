// TODO: Asegúrate de que estas server actions solo se llamen desde componentes de servidor o formularios con action.
"use server"
// Obtener el Access Token de Twitch
export async function getAccessToken() {
    const twitchKey = process.env.TWITCH_CLIENT_ID;
    const twitchKeySecret = process.env.TWITCH_CLIENT_SECRET;

    if (!twitchKey || !twitchKeySecret) {
        throw new Error('Client ID or Client Secret is missing.');
    }

    const params = new URLSearchParams();
    params.append('client_id', twitchKey);
    params.append('client_secret', twitchKeySecret);
    params.append('grant_type', 'client_credentials');

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    const data = await response.json();
    return data.access_token;
};


export async function checkIfStreamerIsLive(streamerName: string) {
    const twitchKey = process.env.TWITCH_CLIENT_ID;
    const accessToken = await getAccessToken();

    if (!twitchKey) {
        throw new Error('Client ID is missing.');
    }

    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${streamerName}`, {
        headers: {
            'Client-ID': twitchKey,
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    return data;
};