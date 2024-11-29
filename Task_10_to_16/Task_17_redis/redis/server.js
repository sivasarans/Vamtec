const express = require('express');
const Queue = require('bull');

const app = express();
const port = 5000;
const cors = require('cors'); // Import cors

// Create a queue
const taskQueue = new Queue('task-queue', 'redis://localhost:6379');
app.use(cors());

// Add a job to the queue via API
app.post('/add-job', async (req, res) => {
    const { taskName, message } = req.query; // Get data from query parameters
    await taskQueue.add({ taskName, message });
    res.send('Job added to the queue!');
});

// Process jobs
taskQueue.process(async (job) => {
    console.log(`Processing job ID: ${job.id}`);
    console.log(`Job data:`, job.data);

    // Simulate task processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Task processed successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
