const axios = require("axios");

exports.handler = async function (event, context) {
  // Ensure you safely access the query parameter, with a fallback to "science-fiction"
  const genre = event.queryStringParameters?.genre || "science-fiction";

  const url = `https://goodreads-books.p.rapidapi.com/genres/${genre}/best`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "goodreads-books.p.rapidapi.com"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error("API Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch books" })
    };
  }
};
