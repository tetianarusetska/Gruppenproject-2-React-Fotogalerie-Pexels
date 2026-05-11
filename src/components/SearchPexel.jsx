export default async function SearchPexels(term) {
    const encodedTerm = encodeURI(term);

    const res = await fetch(`https://api.pexels.com/v1/search/?query=${encodedTerm}&page=1&per-page=15`, {
        headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        }
    })

    const data = await res.json();
    console.log(data)

    return data;
}