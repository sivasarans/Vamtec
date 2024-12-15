import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AdminCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    type: 'task',
    date: '',
    time: '',
    description: '',
    name: '',
    reason: '',
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('calendarData')) || {
      tasks: [
        { date: '2024-12-02', time: '10:00', description: 'Meeting with Team' },
        { date: '2024-12-03', time: '14:00', description: 'Code Review' },
      ],
      leaves: [
        { date: '2024-12-05', name: 'Alice', reason: 'Sick Leave' },
        { date: '2024-12-09', name: 'Bob', reason: 'Family Function' },
        { date: '2024-12-09', name: 'Karan', reason: 'Family Function' },
      ],
    };

    localStorage.setItem('calendarData', JSON.stringify(data)); // Ensure data is stored
  }, []);

  // Update tasks and leaves for the selected date
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('calendarData')) || { tasks: [], leaves: [] };
    // const formattedDate = selectedDate.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format // issue in date for next day applied
    const dateCopy = new Date(selectedDate);
dateCopy.setDate(dateCopy.getDate() +1 );  // Subtract one day
const formattedDate = dateCopy.toISOString().split('T')[0];


    // Filter tasks and leaves for the selected date
    setTasks(data.tasks.filter((task) => task.date === formattedDate));
    setLeaves(data.leaves.filter((leave) => leave.date === formattedDate));
  }, [selectedDate]);

  // Add task or leave
  const handleAddData = () => {
    const data = JSON.parse(localStorage.getItem('calendarData')) || { tasks: [], leaves: [] };
    const newData = { ...data };

    if (formData.type === 'task') {
      newData.tasks.push({
        date: formData.date,
        time: formData.time,
        description: formData.description,
      });
    } else {
      newData.leaves.push({
        date: formData.date,
        name: formData.name,
        reason: formData.reason,
      });
    }

    localStorage.setItem('calendarData', JSON.stringify(newData));
    alert(`${formData.type === 'task' ? 'Task' : 'Leave'} added successfully!`);
    setFormData({ type: 'task', date: '', time: '', description: '', name: '', reason: '' }); // Reset form
  };

  // Highlight dates on the calendar and show leave info on hover


  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Calendar Section */}
      <div className="w-full lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Admin Calendar</h1>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="shadow-lg border rounded-lg"
        //   tileContent={tileContent} // Show leave details on hover
        />
      </div>

      {/* Task and Leave Details Section */}
      <div className="w-full lg:w-2/3 bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Details for {selectedDate.toDateString()}
        </h2>

        {/* Tasks Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-blue-600 mb-2">Tasks:</h3>
          <ul className="list-disc pl-6">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{task.time}</span> - {task.description}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No tasks for this date.</li>
            )}
          </ul>
        </div>

        {/* Leaves Section */}
        <div>
          <h3 className="text-lg font-medium text-red-600 mb-2">Leaves:</h3>
          <ul className="list-disc pl-6">
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{leave.name}</span> - {leave.reason}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No leaves for this date.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Add Data Form */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Add Task or Leave</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddData();
          }}
        >
          <label className="block mb-2">
            Type:
            <select
              className="border rounded px-2 py-1 w-full"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="task">Task</option>
              <option value="leave">Leave</option>
            </select>
          </label>

          <label className="block mb-2">
            Date:
            <input
              type="date"
              className="border rounded px-2 py-1 w-full"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </label>

          {formData.type === 'task' ? (
            <>
              <label className="block mb-2">
                Time:
                <input
                  type="time"
                  className="border rounded px-2 py-1 w-full"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </label>
              <label className="block mb-2">
                Description:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label className="block mb-2">
                Reason:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCalendar;
