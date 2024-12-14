import React, { useState } from 'react';

function App() {
    const [taskName, setTaskName] = useState('');
    const [message, setMessage] = useState('');

    // Function to add a job to the queue
    const addJob = async () => {
        const response = await fetch(
            `http://localhost:5000/add-job?taskName=${taskName}&message=${message}`,
            { method: 'POST' }
        );
        const data = await response.text();
        alert(data);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>React with Redis Queue</h1>
            <div>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={addJob}>Add Job to Queue</button>
            </div>
        </div>
    );
}

export default App;
