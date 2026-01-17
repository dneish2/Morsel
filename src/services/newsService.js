import axios from 'axios';

// Use environment variables for API keys so they can be injected at build/runtime.
// During local development you can create a `.env` with the REACT_APP_* variables.
const BASE_URL = process.env.REACT_APP_NEWSAPI_BASE_URL || 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.REACT_APP_NEWSAPI_KEY || null;

const BASE_URL_2 = process.env.REACT_APP_NEWSDATA_BASE_URL || 'https://newsdata.io/api/1/news';
const API_KEY_2 = process.env.REACT_APP_NEWSDATA_KEY || null;

// Function to fetch articles from the first API
export const fetchArticlesFromFirstAPI = async (query = '', category = '') => {
    try {
        if (!API_KEY) {
            console.warn('REACT_APP_NEWSAPI_KEY is not set. Skipping first API.');
            return { data: [], error: new Error('Missing NEWSAPI key') };
        }

        const response = await axios.get(BASE_URL, {
            params: {
                country: 'us',
                apiKey: API_KEY,
                q: query,
                category: category
            }
        });

        console.log("Articles fetched from First API:", response.data.articles);
        return { data: response.data.articles, error: null }; // Ensure data is always an array
    } catch (error) {
        console.error("Error fetching articles:", error);
        return { data: [], error }; // Return an empty array for data
    }
};


// Function to fetch articles from the second API
// Example adjustment based on hypothetical response structure
export const fetchArticlesFromSecondAPI = async (query = '', category = '') => {
    try {
        if (!API_KEY_2) {
            console.warn('REACT_APP_NEWSDATA_KEY is not set. Skipping second API.');
            return { data: [], error: new Error('Missing NEWSDATA key') };
        }

        const params = { country: 'us', apiKey: API_KEY_2 };
        if (query) params.q = query;
        if (category) params.category = category;

        const response = await axios.get(BASE_URL_2, { params });

        // Hypothetical adjustment based on actual response structure
        const articles = response.data.results || []; // Adjust "results" to the actual key as per the API response
        console.log("Articles fetched from Second API:", articles);
        return { data: articles, error: null };
    } catch (error) {
        console.error("Error fetching articles from the second API:", error);
        return { data: [], error };
    }
};


// Parent function to orchestrate the API calls
export const fetchArticles = async (query = '', category = '') => {
    let combinedData = [];

    const firstAPIResult = await fetchArticlesFromFirstAPI(query, category);
    if (firstAPIResult.error) {
        console.log("Error in the first API, attempting the second API.");
    } else {
        combinedData = combinedData.concat(firstAPIResult.data);
    }

    const secondAPIResult = await fetchArticlesFromSecondAPI(query, category);
    if (secondAPIResult.error) {
        console.log("Error encountered in the second API.");
    } else {
        combinedData = combinedData.concat(secondAPIResult.data);
    }

    console.log("Combined data length:", combinedData.length);
    return combinedData;
};

