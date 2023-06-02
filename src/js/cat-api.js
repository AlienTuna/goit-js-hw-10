const CAT_API_URL = 'https://api.thecatapi.com/v1';
const PRIVATE_KEY = 'live_W32MAYgNIukhE5UF88eJUv7ZKs4dNrJDiuYNuhffPUnLNOSM9MDVUhCU0l61OTSE';
const searchUrl = `${CAT_API_URL}/images/search?limit=1&breed_ids=`
const searchOptions = {
    headers: {'x-api-key' : PRIVATE_KEY },
}

// export const fetchBreeds = async function() {
//     console.info('start fetch')
//     const response = await fetch(`${CAT_API_URL}/breeds`);
//      console.log('response.json()',response.json());
//      return await response.json();
// }
export const fetchBreeds = function() {
        console.info('start fetch')
        return fetch(`${CAT_API_URL}/breeds`)
        .then(response => response.json())
    }

export const fetchCatByBreed = function(breedId) {
    return fetch(`${searchUrl}${breedId}`,searchOptions)
    .then(response => {return response.json()})
}
