const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export async function search(query, page, orientation, size, color, locale) {
    const encodedQuery = encodeURIComponent(query);
    let url = `https://api.pexels.com/v1/search/?query=${encodedQuery}&page=${page}&per-page=15`;

    if (orientation !== "") {
        const encodedOrientation = encodeURIComponent(orientation);
        url = url + `&orientation=${encodedOrientation}`
    }

    if (size !== "") {
        const encodedSize = encodeURIComponent(size);
        url = url + `&size=${encodedSize}`
    }

    if (color !== "") {
        const encodedColor = encodeURIComponent(color);
        url = url + `&color=${encodedColor}`
    }

    if (locale !== "") {
        const encodedLocale = encodeURIComponent(locale);
        url = url + `&locale=${encodedLocale}`
    }

    let result, data;

    try {
        result = await fetch(url, {
        headers: {
            Authorization: apiKey,
        }
    })
    } catch {
        throw new Error(`Something went wrong with the fetching.`);
    }

    if (!result.ok) {
        throw new Error(`Http.Fehler: ${result.status}`)
    }

    try {
        data = await result.json();
    } catch {
        throw new Error(`Decoding failed`)
    }

    return data;
}