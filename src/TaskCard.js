import React from 'react';

const TaskCard = ({ task, users }) => {
  const user = users.find((u) => u.id === task.userId);

  return (
    <div className="task-card">
      <h2>ID: {task.id}</h2>
      <p>Title: {task.title}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>User ID: {task.userId}</p>
      <p>Name: {user ? user.name : 'User not found'}</p>
      <p>Available: {user ? (user.available ? 'Yes' : 'No') : 'N/A'}</p>
    </div>
  );
};

export default TaskCard;
