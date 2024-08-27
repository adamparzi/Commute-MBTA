

const BASE_API_URL = 'https://api-v3.mbta.com'; // Base URL for MBTA API
const API_URL = 'https://api-v3.mbta.com//predictions?filter[stop]=STOP_ID'; // Replace with actual API endpoint

// Function to fetch MBTA data
export const fetchMBTAData = async () => {
  try {
    const response = await fetch(`${API_URL}?api_key=${process.env.MBTA_API}`); // Include the API key in the request
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching MBTA data:', error);
    throw error; // Re-throw error to be handled by the calling function
  }
};
