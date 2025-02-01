import axios from 'axios'

const serverApi = axios.create({
	baseURL: 'http://localhost:5000',
})

/**
 * Creates a shortened URL by sending a POST request to the server.
 *
 * This function makes a POST request to the server with a URL to be shortened.
 * The server processes the request and returns the shortened URL in the response.
 *
 * @param {string} url - The original URL that needs to be shortened.
 * @returns {Promise<object>} - Returns a promise that resolves to the response data
 * from the server containing the shortened URL.
 *
 * @example
 * // Shortens a given URL
 * createUrlShort("https://www.example.com")
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
export const createUrlShort = async (url: string) => {
	const response = await serverApi.post('/', { url })

	return response.data
}
