const axios = require('axios');  // Import Axios

// Function to make a GET request
async function fetchData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('GET response data:', response.data);  // Log response data
  } catch (error) {
    console.error('Error in GET request:', error.message);  // Log error if request fails
  }
}

// Function to make a POST request
async function sendData() {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: '1111111',
      body: '2222222222',
      userId: 1000
    });
    console.log('POST response data:', response.data);  // Log response data
  } catch (error) {
    console.error('Error in POST request:', error.message);  // Log error if request fails
  }
}

// Run both functions
fetchData();
sendData();

