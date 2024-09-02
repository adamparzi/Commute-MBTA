export const API_KEY = process.env.NEXT_PUBLIC_MBTA_API;
export const API_URL_BASE = 'https://api-v3.mbta.com'
//export const API_URL_ROUTE = `https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0&api_key=${API_KEY}`;  // stops
export const API_URL_PREDICTIONS = `https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0&api_key=${API_KEY}`;  // predictions